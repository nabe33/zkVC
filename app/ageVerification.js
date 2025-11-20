const snarkjs = require("snarkjs");
const fs = require("fs");
const path = require("path");
const { ethers } = require("ethers");

// .envファイルを読み込み
require('dotenv').config();

class AgeVerificationSystem {
    constructor(config) {
        this.config = config;
        this.provider = new ethers.JsonRpcProvider(config.rpcUrl);
        this.wallet = new ethers.Wallet(config.privateKey, this.provider);
    }

    // VCからbirthdateを取得してUnixTimeに変換
    // 誕生日はUNIX epock time(1970-1-1)以後に限る！
    parseBirthDateFromVC(vcPath) {
        try {
            const vcData = JSON.parse(fs.readFileSync(vcPath, 'utf8'));
            const birthDate = vcData.credentialSubject.driverLicense.birthDate;
            
            // "2000-07-01" -> Unix timestamp
            const birthdayUnix = Math.floor(new Date(birthDate).getTime() / 1000);
            console.log(`Birthday from VC: ${birthDate} -> ${birthdayUnix}`);
            
            return birthdayUnix;
        } catch (error) {
            throw new Error(`Failed to parse VC: ${error.message}`);
        }
    }

    // 現在の日時をUnixTimeに変換
    getCurrentUnixTime() {
        const todayUnix = Math.floor(Date.now() / 1000);
        console.log(`Today's Unix time: ${todayUnix}`);
        return todayUnix;
    }

    // zk-SNARKプルーフを生成
    async generateProof(birthdayUnix, todayUnix) {
        console.log("Generating zk-SNARK proof...");
        
        const input = {
            birthday: birthdayUnix.toString(),
            today: todayUnix.toString()
        };

        console.log("Input:", input);

        try {
            const wasmPath = path.join(__dirname, "../circom/work/ageCheck/ageCheck_js/ageCheck.wasm");
            const zkeyPath = path.join(__dirname, "../circom/work/ageCheck/circuit_final.zkey");

            if (!fs.existsSync(wasmPath)) {
                throw new Error(`WASM file not found: ${wasmPath}`);
            }
            if (!fs.existsSync(zkeyPath)) {
                throw new Error(`Zkey file not found: ${zkeyPath}`);
            }

            const { proof, publicSignals } = await snarkjs.plonk.fullProve(
                input,
                wasmPath,
                zkeyPath
            );

            console.log("Proof generated successfully");
            console.log("Public signals:", publicSignals);

            return { proof, publicSignals };
        } catch (error) {
            throw new Error(`Proof generation failed: ${error.message}`);
        }
    }

    // Solidityで使用する形式にプルーフを変換
    formatProofForSolidity(proof) {
        console.log("Debug: Proof structure:", Object.keys(proof));
        console.log("Debug: Proof A:", proof.A);
        console.log("Debug: Proof B:", proof.B);
        console.log("Debug: Proof C:", proof.C);

        try {
            // Plonkプルーフの正しい形式（各点は[x, y]のみを使用、zは無視）
            const proofArray = [
                // A点 (x, y)
                proof.A[0], proof.A[1],
                // B点 (x, y) - Plonkでは順序がそのまま
                proof.B[0], proof.B[1],
                // C点 (x, y)
                proof.C[0], proof.C[1],
                // Z点 (x, y)
                proof.Z[0], proof.Z[1],
                // T1点 (x, y)
                proof.T1[0], proof.T1[1],
                // T2点 (x, y)
                proof.T2[0], proof.T2[1],
                // T3点 (x, y)
                proof.T3[0], proof.T3[1],
                // Wxi点 (x, y)
                proof.Wxi[0], proof.Wxi[1],
                // Wxiw点 (x, y)
                proof.Wxiw[0], proof.Wxiw[1],
                // 評価値
                proof.eval_a,
                proof.eval_b,
                proof.eval_c,
                proof.eval_s1,
                proof.eval_s2,
                proof.eval_zw
            ];

            console.log("Debug: Proof array length:", proofArray.length);
            
            if (proofArray.length !== 24) {
                throw new Error(`Expected 24 elements, got ${proofArray.length}`);
            }

            return proofArray.map(x => ethers.getBigInt(x).toString());
        } catch (error) {
            console.error("Error formatting proof:", error);
            console.error("Proof structure:", JSON.stringify(proof, null, 2));
            throw error;
        }
    }

    // スマートコントラクトでプルーフを検証
    async verifyOnChain(proof, publicSignals) {
        console.log("Verifying proof on-chain...");

        try {
            const contractABI = [
                "function verifyAge(uint256[24] calldata proof, uint256 todayUnixTime) external returns (bool)",
                "function isUserVerified(address user) external view returns (bool)",
                "event AgeVerified(address indexed user, bool isOver20, uint256 timestamp)"
            ];

            const contract = new ethers.Contract(
                this.config.contractAddress,
                contractABI,
                this.wallet
            );

            const formattedProof = this.formatProofForSolidity(proof);
            const todayUnixTime = publicSignals[0];

            console.log("Sending transaction...");
            const tx = await contract.verifyAge(formattedProof, todayUnixTime);
            console.log("Transaction hash:", tx.hash);

            const receipt = await tx.wait();
            console.log("Transaction confirmed:", receipt.hash);
            console.log("Block number:", receipt.blockNumber);
            console.log("Gas used:", receipt.gasUsed.toString());

            // イベントログを確認
            if (receipt.logs && receipt.logs.length > 0) {
                console.log("Event logs found:", receipt.logs.length);
                for (const log of receipt.logs) {
                    try {
                        const parsedLog = contract.interface.parseLog(log);
                        if (parsedLog && parsedLog.name === 'AgeVerified') {
                            console.log("Age verification event emitted!");
                            console.log("User:", parsedLog.args.user);
                            console.log("Is over 20:", parsedLog.args.isOver20);
                            console.log("Timestamp:", parsedLog.args.timestamp.toString());
                        }
                    } catch (e) {
                        // ログの解析に失敗した場合はスキップ
                    }
                }
            }

            return receipt.status === 1;
        } catch (error) {
            throw new Error(`On-chain verification failed: ${error.message}`);
        }
    }

    // メイン実行関数
    async run(vcPath) {
        try {
            console.log("=== Age Verification System ===");
            
            // 1. VCから誕生日を取得
            const birthdayUnix = this.parseBirthDateFromVC(vcPath);
            
            // 2. 現在時刻を取得
            const todayUnix = this.getCurrentUnixTime();
            
            // 3. 年齢チェック（デバッグ用）
            const ageInSeconds = todayUnix - birthdayUnix;
            const ageInYears = ageInSeconds / (365.25 * 24 * 60 * 60);
            console.log(`Calculated age: ${ageInYears.toFixed(2)} years`);
            
            if (ageInYears < 20) {
                console.log("Warning: User appears to be under 20 years old");
            }
            
            // 4. zk-SNARKプルーフ生成
            const { proof, publicSignals } = await this.generateProof(birthdayUnix, todayUnix);
            
            // 5. オンチェーン検証
            const success = await this.verifyOnChain(proof, publicSignals);
            
            if (success) {
                console.log("✅ Age verification completed successfully!");
                console.log("🎉 You have successfully proven you are over 20 years old!");
            } else {
                console.log("❌ Age verification failed");
            }
            
            return success;
        } catch (error) {
            console.error("Error:", error.message);
            throw error;
        }
    }
}

// 設定とメイン実行
async function main() {
    // 環境変数をデバッグ出力
    console.log("=== Environment Variables Debug ===");
    console.log("RPC_URL:", process.env.RPC_URL ? "✓ Set" : "✗ Not set");
    console.log("PRIVATE_KEY:", process.env.PRIVATE_KEY ? `✓ Set (length: ${process.env.PRIVATE_KEY.length})` : "✗ Not set");
    console.log("CONTRACT_ADDRESS:", process.env.CONTRACT_ADDRESS ? "✓ Set" : "✗ Not set");
    
    if (process.env.PRIVATE_KEY) {
        console.log("PRIVATE_KEY starts with:", process.env.PRIVATE_KEY.substring(0, 10) + "...");
        
        // 有効な秘密鍵かチェック
        if (!process.env.PRIVATE_KEY.startsWith('0x') || process.env.PRIVATE_KEY.length !== 66) {
            console.error("❌ Invalid PRIVATE_KEY format. Must be 0x + 64 hex chars (total 66 chars)");
            console.error("Example: 0x1234567890abcdef...");
            return;
        }
        
        // 全て0でないかチェック
        if (process.env.PRIVATE_KEY === "0x" + "0".repeat(64)) {
            console.error("❌ PRIVATE_KEY is all zeros. Please use a valid private key.");
            return;
        }
    }

    const config = {
        rpcUrl: process.env.RPC_URL || "https://sepolia.infura.io/v3/YOUR_PROJECT_ID",
        privateKey: process.env.PRIVATE_KEY || "0x" + "0".repeat(64),
        contractAddress: process.env.CONTRACT_ADDRESS || "0x" + "0".repeat(40)
    };

    console.log("=== Configuration ===");
    console.log("RPC URL:", config.rpcUrl);
    console.log("Contract Address:", config.contractAddress);
    console.log("=====================================\n");

    const vcPath = path.join(__dirname, "../vc/vc.json");
    
    try {
        const verifier = new AgeVerificationSystem(config);
        await verifier.run(vcPath);
    } catch (error) {
        console.error("Failed to create AgeVerificationSystem:", error.message);
        console.error("\nPlease check your .env file configuration:");
        console.error("1. Ensure PRIVATE_KEY is a valid 64-character hex string starting with 0x");
        console.error("2. Ensure RPC_URL is a valid Sepolia endpoint");
        console.error("3. Ensure CONTRACT_ADDRESS is set after deployment");
    }
}

// CLIから直接実行された場合
if (require.main === module) {
    main()
        .then(() => {
            console.log("\n🏁 Process completed.");
            process.exit(0);
        })
        .catch((error) => {
            console.error("❌ Process failed:", error);
            process.exit(1);
        });
}

module.exports = { AgeVerificationSystem };