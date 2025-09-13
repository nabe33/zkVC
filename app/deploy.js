const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

async function deployContracts() {
    try {
        console.log("=== Deploying Age Verification Contracts with Foundry ===");

        // プロバイダーとウォレットの設定（デバッグ用）
        const provider = new ethers.JsonRpcProvider(process.env.RPC_URL || "http://localhost:8545");
        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
        
        console.log("Deployer address:", wallet.address);
        console.log("Balance:", ethers.formatEther(await provider.getBalance(wallet.address)), "ETH");

        // Foundryを使用したデプロイメントの説明
        console.log("Note: This project uses Foundry for contract compilation and deployment");
        console.log("Example commands:");
        console.log("  cd ../contract");
        console.log("  forge build");
        console.log("  forge script script/Deploy.s.sol:DeployScript --rpc-url $RPC_URL --broadcast");

        // デプロイメント情報を保存するファイル（テンプレート）
        const deploymentInfo = {
            network: process.env.NETWORK || "localhost",
            timestamp: new Date().toISOString(),
            deployer: wallet.address,
            contracts: {
                PlonkVerifier: {
                    address: "0x" + "0".repeat(40), // プレースホルダー
                    deploymentHash: ""
                },
                AgeVerifier: {
                    address: "0x" + "0".repeat(40), // プレースホルダー  
                    deploymentHash: ""
                }
            },
            note: "Run Foundry deployment script to get actual addresses"
        };

        // デプロイメント情報を保存
        const deploymentPath = path.join(__dirname, "deployment.json");
        fs.writeFileSync(deploymentPath, JSON.stringify(deploymentInfo, null, 2));
        console.log("Deployment template saved to:", deploymentPath);

        console.log("\n=== Next Steps ===");
        console.log("1. Install Foundry if not installed:");
        console.log("   curl -L https://foundry.paradigm.xyz | bash");
        console.log("   foundryup");
        console.log("2. Navigate to contract directory and install dependencies:");
        console.log("   cd ../contract && forge install foundry-rs/forge-std");
        console.log("3. Compile the Solidity contracts:");
        console.log("   forge build");
        console.log("4. Deploy contracts:");
        console.log("   forge script script/Deploy.s.sol:DeployScript --rpc-url $RPC_URL --broadcast");
        console.log("5. Update .env file with CONTRACT_ADDRESS from deployment output");

    } catch (error) {
        console.error("Deployment setup failed:", error);
        throw error;
    }
}

// Foundry deployment helper function
async function foundryDeploy(network = "localhost") {
    console.log("=== Foundry Deployment Helper ===");
    console.log(`Deploying to network: ${network}`);
    
    const { spawn } = require('child_process');
    const contractDir = path.join(__dirname, '../contract');
    
    return new Promise((resolve, reject) => {
        const deployCommand = spawn('forge', [
            'script',
            'script/Deploy.s.sol:DeployScript',
            '--rpc-url',
            'sepolia',
            '--broadcast',
            '--verify',
            '-vvvv'
        ], {
            cwd: contractDir,
            stdio: 'pipe'
        });

        let output = '';
        let errorOutput = '';

        deployCommand.stdout.on('data', (data) => {
            output += data.toString();
            console.log(data.toString());
        });

        deployCommand.stderr.on('data', (data) => {
            errorOutput += data.toString();
            console.error(data.toString());
        });

        deployCommand.on('close', (code) => {
            if (code === 0) {
                console.log('Deployment completed successfully');
                
                // Parse deployment addresses from output
                const verifierMatch = output.match(/PlonkVerifier deployed to: (0x[a-fA-F0-9]{40})/);
                const ageVerifierMatch = output.match(/AgeVerifier deployed to: (0x[a-fA-F0-9]{40})/);
                
                if (verifierMatch && ageVerifierMatch) {
                    const deploymentInfo = {
                        network,
                        timestamp: new Date().toISOString(),
                        contracts: {
                            PlonkVerifier: { address: verifierMatch[1] },
                            AgeVerifier: { address: ageVerifierMatch[1] }
                        }
                    };
                    
                    fs.writeFileSync(
                        path.join(__dirname, 'deployment.json'),
                        JSON.stringify(deploymentInfo, null, 2)
                    );
                    
                    resolve(deploymentInfo);
                } else {
                    reject(new Error('Could not parse deployment addresses from output'));
                }
            } else {
                reject(new Error(`Deployment failed with exit code ${code}: ${errorOutput}`));
            }
        });
    });
}

if (require.main === module) {
    deployContracts().catch(console.error);
}

module.exports = { deployContracts, foundryDeploy };