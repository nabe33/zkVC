import { Injectable } from '@nestjs/common';
import { Resolver } from 'did-resolver';
import { getResolver } from 'ethr-did-resolver';
import { verifyCredential } from 'did-jwt-vc';
import { EthrDID, KeyPair } from 'ethr-did';
import { ethers, Wallet } from 'ethers';
import * as fs from 'fs';
import * as path from 'path';
const snarkjs = require('snarkjs');
@Injectable()
export class AppService {
  private ethrDidInstance: EthrDID | null = null; // EthrDIDインスタンスをキャッシュ

  private getWalletInfo() {
    const privateKey = process.env.PRIVATE_KEY!;
    const wallet = new Wallet(privateKey);
    return {
      privateKey,
      publicKey: wallet.signingKey.publicKey,
      address: wallet.address, // アドレスはDIDの識別子として使用
    };
  }

  // DIDの文字列を生成するヘルパー関数
  private getDIDString(address: string) {
    return `did:ethr:sepolia:${address}`;
  }

  // EthrDIDインスタンス（DIDドキュメント）を作成するヘルパー関数
  private async getEthrDID(): Promise<EthrDID> {
    // 既にインスタンスが存在する場合はそれを返す
    if (this.ethrDidInstance) {
      return this.ethrDidInstance;
    }

    const walletInfo = this.getWalletInfo();
    const alchemyApiKey = process.env.ALCHEMY_API_KEY!;
    const provider = new ethers.AlchemyProvider('sepolia', alchemyApiKey);
    const txSigner = new Wallet(walletInfo.privateKey, provider);

    const keypair: KeyPair = {
      privateKey: walletInfo.privateKey,
      publicKey: walletInfo.publicKey,
      address: walletInfo.address,
      identifier: walletInfo.address,
    };

    // EthrDIDインスタンス(DIDドキュメント)を作成
    console.log('=== EthrDIDインスタンス作成開始 ===');
    this.ethrDidInstance = new EthrDID({
      ...keypair,
      provider: provider,
      txSigner: txSigner,
      chainNameOrId: 'sepolia',
      registry: '0x03d5003bf0e79C5F5223588F347ebA39AfbC3818',
    });
    console.log('=== EthrDIDインスタンス作成完了 ===');
    console.log('DID:', this.getDIDString(walletInfo.address));

    return this.ethrDidInstance;
  }

  // シンプルなヘルスチェック
  getHello(): string {
    return 'Hello World!';
  }

  // 現在のDID情報を取得
  getCurrentDID(): any {
    const walletInfo = this.getWalletInfo();
    const currentDID = this.getDIDString(walletInfo.address);

    return {
      address: walletInfo.address,
      did: currentDID,
      publicKey: walletInfo.publicKey,
    };
  }

  // DIDドキュメントをブロックチェーンから解決して取得
  async resolveDID(): Promise<any> {
    const walletInfo = this.getWalletInfo();
    const currentDID = this.getDIDString(walletInfo.address);

    const providerConfig = {
      rpcUrl: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      registry: '0x03d5003bf0e79C5F5223588F347ebA39AfbC3818',
      name: 'sepolia',
    };

    const ethrDidResolver = getResolver(providerConfig); // ERC1056のリゾルバー
    const didResolver = new Resolver(ethrDidResolver);

    console.log('=== DID解決処理開始 ===');
    console.log('現在の秘密鍵から生成されるアドレス:', walletInfo.address);
    console.log('解決対象DID:', currentDID);
    console.log('Provider設定:', providerConfig);

    try {
      const result = await didResolver.resolve(currentDID);
      console.log('=== DID解決成功 ===');
      console.log('didResolver:');
      console.dir(result, { depth: 3 });
      return result;
    } catch (error) {
      console.log('=== DID解決エラー ===');
      console.error('Error details:', error);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      throw error;
    }
  }

  // DID登録処理
  // ブロックチェーンにDIDドキュメントを登録
  async registerDID(): Promise<void> {
    const walletInfo = this.getWalletInfo();
    const ethrDid = await this.getEthrDID();
    // DID登録の開始ログ
    console.log('=== DIDドキュメント登録開始 ===');
    console.log('登録するアドレス:', walletInfo.address);
    console.log('登録するDID:', this.getDIDString(walletInfo.address));

    // DIDの属性を設定してブロックチェーンにDIDドキュメントを登録
    // ・署名鍵の公開鍵を設定
    // ・31104000は属性の有効期限（秒単位、ここでは1年）
    // 詳細はhttps://github.com/uport-project/ethr-did/issues/81#issuecomment-1030181286
    await ethrDid.setAttribute(
      'did/pub/Secp256k1/sigAuth/hex', // DID公開鍵情報/暗号化アルゴリズム/署名認証/16進数
      walletInfo.publicKey, // 公開鍵で署名を検証
      31104000,
    );

    console.log('=== DIDドキュメント登録完了 ===');
  }

  // VC（Verifiable Credential）を発行
  // issuerPrivateKey: 発行者（運転免許センター）の秘密鍵
  // hodlerAddress: VCを受け取る人（運転者）のアドレス
  async issueVc(
    issuerPrivateKey: string,
    hodlerAddress: string,
    driverName: string,
    birthDate: string,
    licenseType: string,
  ): Promise<string> {
    try {
      console.log('=== VC発行処理開始 ===');
      console.log('受信したパラメータ:', {
        issuerPrivateKey: issuerPrivateKey ? 'あり' : 'なし',
        hodlerAddress,
        driverName,
        birthDate,
        licenseType,
      });

      // 発行者の情報を秘密鍵から生成
      const issuerWallet = new Wallet(issuerPrivateKey);
      const issuerAddress = issuerWallet.address;
      const issuerDID = this.getDIDString(issuerAddress);

      console.log('発行者情報:', { issuerAddress, issuerDID });

      const vcpayload = {
        '@context': ['https://www.w3.org/2018/credentials/v1'],
        type: ['VerifiableCredential', 'DriverLicenseCredential'],
        issuer: issuerDID,
        issuanceDate: new Date().toISOString(),
        credentialSubject: {
          id: `did:ethr:sepolia:${hodlerAddress}`,
          driverLicense: {
            driverName: driverName,
            birthDate: birthDate,
            licenseType: licenseType,
          },
        },
        proof: {
          type: 'EcdsaSecp256k1Signature2019',
          created: new Date().toISOString(),
          proofPurpose: 'assertionMethod',
          verificationMethod: `${issuerDID}#delegate-1`,
        },
      };

      console.log('=== VC発行開始 ===');
      console.log('発行者DID:', issuerDID);
      console.log('受信者アドレス:', hodlerAddress);
      console.log('VCペイロード:', vcpayload);

      // 発行者専用のEthrDIDインスタンスを作成
      console.log('=== 発行者用EthrDIDインスタンス作成開始 ===');
      const alchemyApiKey = process.env.ALCHEMY_API_KEY!;
      const provider = new ethers.AlchemyProvider('sepolia', alchemyApiKey);
      const txSigner = new Wallet(issuerPrivateKey, provider);

      const keypair: KeyPair = {
        privateKey: issuerPrivateKey,
        publicKey: issuerWallet.signingKey.publicKey,
        address: issuerAddress,
        identifier: issuerAddress,
      };

      const ethrDid = new EthrDID({
        ...keypair,
        provider: provider,
        txSigner: txSigner,
        chainNameOrId: 'sepolia',
        registry: '0x03d5003bf0e79C5F5223588F347ebA39AfbC3818',
      });

      // VCを署名して発行
      const vc = await ethrDid.signJWT(vcpayload);
      console.log('=== VC発行完了 ===');
      console.log('発行されたVC:', vc);
      return vc;
    } catch (error: any) {
      console.error('=== VC発行エラー ===');
      console.error('Error details:', error);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      throw error;
    }
  }

  // VC（Verifiable Credential）を検証
  async verifyVc(vc: string): Promise<boolean> {
    const providerConfig = {
      // While experimenting, you can set a rpc endpoint to be used by the web3 provider
      rpcUrl: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      // You can also set the address for your own ethr-did-registry (ERC1056) contract
      registry: '0x03d5003bf0e79C5F5223588F347ebA39AfbC3818',
      name: 'sepolia', // this becomes did:ethr:development:0x...
    };

    // It's recommended to use the multi-network configuration when using this in production
    // since that allows you to resolve on multiple public and private networks at the same time.

    // getResolver will return an object with a key/value pair of { "ethr": resolver } where resolver is a function used by the generic did resolver.
    const ethrDidResolver = getResolver(providerConfig);
    const didResolver = new Resolver(ethrDidResolver);
    try {
      // VCを検証
      console.log('=== VC検証開始 ===');
      // did-jwt-vcを使用してVCを検証（DIDドキュメントから公開鍵を取得して検証）
      await verifyCredential(vc, didResolver);
      console.log('=== VC検証成功 ===');
      return true;
    } catch (error: any) {
      console.error('Error verifying VC:', error);
      return false;
    }
  }

  // VCファイルをwebアプリのpublicディレクトリにコピー
  async copyVcFile(): Promise<{ success: boolean; message: string }> {
    try {
      console.log('=== VCファイルコピー開始 ===');

      // ソースファイル（vc/vc.json）のパス
      const sourcePath = path.join(__dirname, '../../vc/vc.json');
      // コピー先ファイル（web/public/vc.json）のパス
      const destinationPath = path.join(__dirname, '../../web/public/vc.json');

      console.log('Source path:', sourcePath);
      console.log('Destination path:', destinationPath);

      // ソースファイルが存在するかチェック
      if (!fs.existsSync(sourcePath)) {
        console.error('Source file does not exist:', sourcePath);
        return { success: false, message: 'Source VC file not found' };
      }

      // コピー先ディレクトリが存在するかチェック（なければ作成）
      const destinationDir = path.dirname(destinationPath);
      if (!fs.existsSync(destinationDir)) {
        fs.mkdirSync(destinationDir, { recursive: true });
      }

      // ファイルをコピー
      fs.copyFileSync(sourcePath, destinationPath);

      console.log('=== VCファイルコピー完了 ===');
      return { success: true, message: 'VC file copied successfully' };
    } catch (error: any) {
      console.error('=== VCファイルコピーエラー ===');
      console.error('Error details:', error);
      return { success: false, message: `Copy failed: ${error.message}` };
    }
  }

  // JSON形式のVC（Verifiable Credential）を検証
  async verifyJsonVc(vcJson: any): Promise<boolean> {
    try {
      console.log('=== JSON VC検証開始 ===');
      console.log('検証対象VC:', vcJson);

      // 基本的なVC構造の検証
      if (!vcJson || typeof vcJson !== 'object') {
        console.error('Invalid VC: not an object');
        return false;
      }

      // 必須フィールドの存在確認
      const requiredFields = ['@context', 'type', 'issuer', 'issuanceDate', 'credentialSubject'];
      for (const field of requiredFields) {
        if (!vcJson[field]) {
          console.error(`Invalid VC: missing required field ${field}`);
          return false;
        }
      }

      // typeの検証
      if (!Array.isArray(vcJson.type) || !vcJson.type.includes('VerifiableCredential')) {
        console.error('Invalid VC: type must be array containing VerifiableCredential');
        return false;
      }

      // contextの検証
      if (!Array.isArray(vcJson['@context']) || !vcJson['@context'].includes('https://www.w3.org/2018/credentials/v1')) {
        console.error('Invalid VC: @context must contain standard VC context');
        return false;
      }

      // issuerの検証（DID形式かチェック）
      if (typeof vcJson.issuer !== 'string' || !vcJson.issuer.startsWith('did:')) {
        console.error('Invalid VC: issuer must be a DID string');
        return false;
      }

      // credentialSubjectの検証
      if (!vcJson.credentialSubject || typeof vcJson.credentialSubject !== 'object') {
        console.error('Invalid VC: credentialSubject must be an object');
        return false;
      }

      if (!vcJson.credentialSubject.id || !vcJson.credentialSubject.id.startsWith('did:')) {
        console.error('Invalid VC: credentialSubject.id must be a DID string');
        return false;
      }

      // 運転免許証特有の検証
      if (vcJson.type.includes('DriverLicenseCredential')) {
        const driverLicense = vcJson.credentialSubject.driverLicense;
        if (!driverLicense || !driverLicense.driverName || !driverLicense.birthDate || !driverLicense.licenseType) {
          console.error('Invalid DriverLicenseCredential: missing required driver license fields');
          return false;
        }
      }

      // issuanceDateの検証
      const issuanceDate = new Date(vcJson.issuanceDate);
      if (isNaN(issuanceDate.getTime())) {
        console.error('Invalid VC: issuanceDate is not a valid date');
        return false;
      }

      // 発行日が未来でないことを確認
      const now = new Date();
      if (issuanceDate > now) {
        console.error('Invalid VC: issuanceDate cannot be in the future');
        return false;
      }

      // proofの検証（存在する場合）
      if (vcJson.proof) {
        if (typeof vcJson.proof !== 'object' || !vcJson.proof.type || !vcJson.proof.verificationMethod) {
          console.error('Invalid VC: proof structure is invalid');
          return false;
        }
      }

      console.log('=== JSON VC検証成功 ===');
      return true;
    } catch (error: any) {
      console.error('=== JSON VC検証エラー ===');
      console.error('Error verifying JSON VC:', error);
      return false;
    }
  }

  // ゼロ知識証明による年齢検証
  async verifyAge(): Promise<{ success: boolean; message: string }> {
    try {
      console.log('=== 年齢検証開始 ===');

      // VCファイルからbirthdateを取得
      const vcPath = path.join(__dirname, '../../vc/vc.json');
      console.log('Looking for VC file at:', vcPath);
      if (!fs.existsSync(vcPath)) {
        return { success: false, message: 'VC file not found' };
      }

      const vcData = JSON.parse(fs.readFileSync(vcPath, 'utf8'));
      const birthDate = vcData.credentialSubject?.driverLicense?.birthDate;

      if (!birthDate) {
        return { success: false, message: 'Birth date not found in VC' };
      }

      console.log(`Birthday from VC: ${birthDate}`);

      // 誕生日をUnix timestampに変換 (private input)
      const birthdayUnix = Math.floor(new Date(birthDate).getTime() / 1000);

      // 現在の日時をUnix timestampに変換 (public input)
      const todayUnix = Math.floor(Date.now() / 1000);

      console.log(`Birthday Unix: ${birthdayUnix}`);
      console.log(`Today Unix: ${todayUnix}`);

      // 年齢を計算（デバッグ用）
      const ageInSeconds = todayUnix - birthdayUnix;
      const ageInYears = ageInSeconds / (365.25 * 24 * 60 * 60);
      console.log(`Calculated age: ${ageInYears.toFixed(2)} years`);
      console.log(`Is over 20? ${ageInYears >= 20}`);

      // Circomファイルのパスを確認
      const wasmPath = path.join(__dirname, '../../circom/work/ageCheck/ageCheck_js/ageCheck.wasm');
      const zkeyPath = path.join(__dirname, '../../circom/work/ageCheck/circuit_final.zkey');

      if (!fs.existsSync(wasmPath)) {
        console.error(`WASM file not found: ${wasmPath}`);
        return {
          success: false,
          message: 'Zero-knowledge proof files not found - WASM file missing'
        };
      }

      if (!fs.existsSync(zkeyPath)) {
        console.error(`Zkey file not found: ${zkeyPath}`);
        return {
          success: false,
          message: 'Zero-knowledge proof files not found - Zkey file missing'
        };
      }

      // zk-SNARKプルーフを生成
      console.log('Generating zk-SNARK proof...');
      const input = {
        birthday: birthdayUnix.toString(),
        today: todayUnix.toString()
      };

      console.log('Input:', input);

      const { proof, publicSignals } = await snarkjs.plonk.fullProve(
        input,
        wasmPath,
        zkeyPath
      );

      console.log('Proof generated successfully');
      console.log('Public signals:', publicSignals);

      // プルーフの検証（ローカルで行う簡易版）
      // 実際のプロジェクトではverification keyを使用して検証する
      const verificationKeyPath = path.join(__dirname, '../../circom/work/ageCheck/verification_key.json');

      if (fs.existsSync(verificationKeyPath)) {
        try {
          const vKey = JSON.parse(fs.readFileSync(verificationKeyPath, 'utf8'));
          const isValid = await snarkjs.plonk.verify(vKey, publicSignals, proof);

          console.log('=== 年齢検証完了 ===');
          console.log(`ZK proof verification result: ${isValid}`);
          return {
            success: isValid,
            message: isValid ? 'Age verification successful with ZK proof' : 'Age verification failed'
          };
        } catch (error) {
          console.error('Verification error:', error);
          return {
            success: false,
            message: 'Zero-knowledge proof verification failed'
          };
        }
      } else {
        // Verification keyがない場合はエラー
        console.error(`Verification key not found: ${verificationKeyPath}`);
        return {
          success: false,
          message: 'Zero-knowledge proof files not found - Verification key missing'
        };
      }

    } catch (error: any) {
      console.error('=== 年齢検証エラー ===');
      console.error('Error details:', error);
      const result = { success: false, message: `Age verification failed: ${error.message}` };
      console.log('Returning error result:', result);
      return result;
    }
  }
}
