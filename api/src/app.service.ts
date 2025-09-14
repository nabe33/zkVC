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
  private ethrDidInstance: EthrDID | null = null; // Cache EthrDID instance

  private getWalletInfo() {
    const privateKey = process.env.PRIVATE_KEY!;
    const wallet = new Wallet(privateKey);
    return {
      privateKey,
      publicKey: wallet.signingKey.publicKey,
      address: wallet.address, // Address used as DID identifier
    };
  }

  // Helper function to generate DID string
  private getDIDString(address: string) {
    return `did:ethr:sepolia:${address}`;
  }

  // Helper function to create EthrDID instance (DID document)
  private async getEthrDID(): Promise<EthrDID> {
    // Return existing instance if it exists
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

    // Create EthrDID instance (DID document)
    console.log('=== Starting EthrDID instance creation ===');
    this.ethrDidInstance = new EthrDID({
      ...keypair,
      provider: provider,
      txSigner: txSigner,
      chainNameOrId: 'sepolia',
      registry: '0x03d5003bf0e79C5F5223588F347ebA39AfbC3818', // Sepolia registry address
    });
    console.log('=== EthrDID instance creation completed ===');
    console.log('DID:', this.getDIDString(walletInfo.address));

    return this.ethrDidInstance;
  }

  // Simple health check
  getHello(): string {
    return 'Hello World!';
  }

  // Get current DID information
  getCurrentDID(): any {
    const walletInfo = this.getWalletInfo();
    const currentDID = this.getDIDString(walletInfo.address);

    return {
      address: walletInfo.address,
      did: currentDID,
      publicKey: walletInfo.publicKey,
    };
  }

  // Resolve and retrieve DID document from blockchain
  async resolveDID(): Promise<any> {
    const walletInfo = this.getWalletInfo();
    const currentDID = this.getDIDString(walletInfo.address);

    const providerConfig = {
      rpcUrl: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      registry: '0x03d5003bf0e79C5F5223588F347ebA39AfbC3818',
      name: 'sepolia',
    };

    const ethrDidResolver = getResolver(providerConfig); // ERC1056 resolver
    const didResolver = new Resolver(ethrDidResolver);

    console.log('=== Starting DID resolution process ===');
    console.log('Address generated from current private key:', walletInfo.address);
    console.log('Target DID for resolution:', currentDID);
    console.log('Provider configuration:', providerConfig);

    try {
      const result = await didResolver.resolve(currentDID);
      console.log('=== DID resolution successful ===');
      console.log('didResolver:');
      console.dir(result, { depth: 3 });
      return result;
    } catch (error) {
      console.log('=== DID resolution error ===');
      console.error('Error details:', error);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      throw error;
    }
  }

  // DID registration process
  // Register DID document to blockchain
  async registerDID(): Promise<void> {
    const walletInfo = this.getWalletInfo();
    const ethrDid = await this.getEthrDID();
    // Start DID registration logging
    console.log('=== Starting DID document registration ===');
    console.log('Registering address:', walletInfo.address);
    console.log('Registering DID:', this.getDIDString(walletInfo.address));

    // Set DID attributes and register DID document to blockchain
    // - Set public key for signing
    // - 31104000 is attribute validity period (seconds, 1 year here)
    // Details: https://github.com/uport-project/ethr-did/issues/81#issuecomment-1030181286
    await ethrDid.setAttribute(
      'did/pub/Secp256k1/sigAuth/hex', // DID public key info/encryption algorithm/signature auth/hex
      walletInfo.publicKey, // Verify signature with public key
      31104000,
    );

    console.log('=== DID document registration completed ===');
  }

  // Issue VC (Verifiable Credential)
  // issuerPrivateKey: Private key of issuer (driver's license center)
  // hodlerAddress: Address of VC recipient (driver)
  async issueVc(
    issuerPrivateKey: string,
    hodlerAddress: string,
    driverName: string,
    birthDate: string,
    licenseType: string,
  ): Promise<string> {
    try {
      console.log('=== Starting VC issuance process ===');
      console.log('Received parameters:', {
        issuerPrivateKey: issuerPrivateKey ? 'exists' : 'none',
        hodlerAddress,
        driverName,
        birthDate,
        licenseType,
      });

      // Generate issuer information from private key
      const issuerWallet = new Wallet(issuerPrivateKey);
      const issuerAddress = issuerWallet.address;
      const issuerDID = this.getDIDString(issuerAddress);

      console.log('Issuer information:', { issuerAddress, issuerDID });

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

      console.log('=== Starting VC issuance ===');
      console.log('Issuer DID:', issuerDID);
      console.log('Recipient address:', hodlerAddress);
      console.log('VC payload:', vcpayload);

      // Create EthrDID instance for issuer
      console.log('=== start generate EthrDID instance of issuer ===');
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

      // Sign and issue VC
      const vc = await ethrDid.signJWT(vcpayload);
      console.log('=== VC issuance completed ===');
      console.log('Issued VC:', vc);
      return vc;
    } catch (error: any) {
      console.error('=== VC issuance error ===');
      console.error('Error details:', error);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      throw error;
    }
  }

  // Verify VC (Verifiable Credential)
  async verifyVc(vc: string): Promise<boolean> {
    const providerConfig = {
      // While experimenting, you can set a rpc endpoint to be used by the web3 provider
      rpcUrl: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      // You can also set the address for your own ethr-did-registry (ERC1056) contract
      registry: '0x03d5003bf0e79C5F5223588F347ebA39AfbC3818',
      name: 'sepolia', // The network name 
    };

    // It's recommended to use the multi-network configuration when using this in production
    // since that allows you to resolve on multiple public and private networks at the same time.

    // getResolver will return an object with a key/value pair of { "ethr": resolver } where resolver is a function used by the generic did resolver.
    const ethrDidResolver = getResolver(providerConfig);
    const didResolver = new Resolver(ethrDidResolver);
    try {
      // Verify VC
      console.log('=== Starting VC verification ===');
      // Verify VC using did-jwt-vc (get public key from DID document for verification)
      await verifyCredential(vc, didResolver);
      console.log('=== VC verification successful ===');
      return true;
    } catch (error: any) {
      console.error('Error verifying VC:', error);
      return false;
    }
  }

  // Copy VC file to web app's public directory
  async copyVcFile(): Promise<{ success: boolean; message: string }> {
    try {
      console.log('=== Starting VC file copy ===');

      // Source file path (vc/vc.json)
      const sourcePath = path.join(__dirname, '../../vc/vc.json');
      // Destination file path (web/public/vc.json)
      const destinationPath = path.join(__dirname, '../../web/public/vc.json');

      console.log('Source path:', sourcePath);
      console.log('Destination path:', destinationPath);

      // Check if source file exists
      if (!fs.existsSync(sourcePath)) {
        console.error('Source file does not exist:', sourcePath);
        return { success: false, message: 'Source VC file not found' };
      }

      // Check if destination directory exists (create if not)
      const destinationDir = path.dirname(destinationPath);
      if (!fs.existsSync(destinationDir)) {
        fs.mkdirSync(destinationDir, { recursive: true });
      }

      // Copy file
      fs.copyFileSync(sourcePath, destinationPath);

      console.log('=== VC file copy completed ===');
      return { success: true, message: 'VC file copied successfully' };
    } catch (error: any) {
      console.error('=== VC file copy error ===');
      console.error('Error details:', error);
      return { success: false, message: `Copy failed: ${error.message}` };
    }
  }

  // Verify JSON format VC (Verifiable Credential)
  async verifyJsonVc(vcJson: any): Promise<boolean> {
    try {
      console.log('=== Starting JSON VC verification ===');
      console.log('VC to verify:', vcJson);

      // Basic VC structure validation
      if (!vcJson || typeof vcJson !== 'object') {
        console.error('Invalid VC: not an object');
        return false;
      }

      // Check existence of required fields
      const requiredFields = ['@context', 'type', 'issuer', 'issuanceDate', 'credentialSubject'];
      for (const field of requiredFields) {
        if (!vcJson[field]) {
          console.error(`Invalid VC: missing required field ${field}`);
          return false;
        }
      }

      // Validate type
      if (!Array.isArray(vcJson.type) || !vcJson.type.includes('VerifiableCredential')) {
        console.error('Invalid VC: type must be array containing VerifiableCredential');
        return false;
      }

      // Validate context
      if (!Array.isArray(vcJson['@context']) || !vcJson['@context'].includes('https://www.w3.org/2018/credentials/v1')) {
        console.error('Invalid VC: @context must contain standard VC context');
        return false;
      }

      // Validate issuer (check DID format)
      if (typeof vcJson.issuer !== 'string' || !vcJson.issuer.startsWith('did:')) {
        console.error('Invalid VC: issuer must be a DID string');
        return false;
      }

      // Validate credentialSubject
      if (!vcJson.credentialSubject || typeof vcJson.credentialSubject !== 'object') {
        console.error('Invalid VC: credentialSubject must be an object');
        return false;
      }

      if (!vcJson.credentialSubject.id || !vcJson.credentialSubject.id.startsWith('did:')) {
        console.error('Invalid VC: credentialSubject.id must be a DID string');
        return false;
      }

      // Driver's license specific validation
      if (vcJson.type.includes('DriverLicenseCredential')) {
        const driverLicense = vcJson.credentialSubject.driverLicense;
        if (!driverLicense || !driverLicense.driverName || !driverLicense.birthDate || !driverLicense.licenseType) {
          console.error('Invalid DriverLicenseCredential: missing required driver license fields');
          return false;
        }
      }

      // Validate issuanceDate
      const issuanceDate = new Date(vcJson.issuanceDate);
      if (isNaN(issuanceDate.getTime())) {
        console.error('Invalid VC: issuanceDate is not a valid date');
        return false;
      }

      // Ensure issuance date is not in the future
      const now = new Date();
      if (issuanceDate > now) {
        console.error('Invalid VC: issuanceDate cannot be in the future');
        return false;
      }

      // Validate proof (if exists)
      if (vcJson.proof) {
        if (typeof vcJson.proof !== 'object' || !vcJson.proof.type || !vcJson.proof.verificationMethod) {
          console.error('Invalid VC: proof structure is invalid');
          return false;
        }
      }

      console.log('=== JSON VC verification successful ===');
      return true;
    } catch (error: any) {
      console.error('=== JSON VC verification error ===');
      console.error('Error verifying JSON VC:', error);
      return false;
    }
  }

  // Age verification using zero-knowledge proof
  async verifyAge(): Promise<{ success: boolean; message: string }> {
    try {
      console.log('=== Starting age verification ===');

      // Get birthdate from VC file
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

      // console.log(`Birthday from VC: ${birthDate}`);

      // Convert birthdate to Unix timestamp (private input)
      const birthdayUnix = Math.floor(new Date(birthDate).getTime() / 1000);

      // Convert current date to Unix timestamp (public input)
      const todayUnix = Math.floor(Date.now() / 1000);

      // console.log(`Birthday Unix: ${birthdayUnix}`);
      // console.log(`Today Unix: ${todayUnix}`);

      // Calculate age (for debugging)
      const ageInSeconds = todayUnix - birthdayUnix;
      const ageInYears = ageInSeconds / (365.25 * 24 * 60 * 60);
      console.log(`Calculated age: ${ageInYears.toFixed(2)} years`);
      console.log(`Is over 20? ${ageInYears >= 20}`);

      // Check paths for Circom files
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

      // Generate zk-SNARK proof
      console.log('Generating zk-SNARK proof...');
      const input = {
        birthday: birthdayUnix.toString(),
        today: todayUnix.toString()
      };

      // console.log('Input:', input);

      const { proof, publicSignals } = await snarkjs.plonk.fullProve(
        input,
        wasmPath,
        zkeyPath
      );

      console.log('Proof generated successfully');
      console.log('Public signals:', publicSignals);

      // Proof verification (simplified local version)
      // In actual projects, use verification key for verification
      const verificationKeyPath = path.join(__dirname, '../../circom/work/ageCheck/verification_key.json');

      if (fs.existsSync(verificationKeyPath)) {
        try {
          const vKey = JSON.parse(fs.readFileSync(verificationKeyPath, 'utf8'));
          const isValid = await snarkjs.plonk.verify(vKey, publicSignals, proof);  // Verify proof using verification key

          console.log('=== Age verification completed ===');
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
        // Error if verification key is not found
        console.error(`Verification key not found: ${verificationKeyPath}`);
        return {
          success: false,
          message: 'Zero-knowledge proof files not found - Verification key missing'
        };
      }

    } catch (error: any) {
      console.error('=== Age verification error ===');
      console.error('Error details:', error);
      const result = { success: false, message: `Age verification failed: ${error.message}` };
      console.log('Returning error result:', result);
      return result;
    }
  }
}
