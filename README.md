# Digital Identity -> Trust system: zkVC

## Global Scope

As written in [“Solving Web2 SNS Issues with Web3,”](https://note.com/nabe33/n/n2541b68c26ef) I, as a researcher, designer, and builder, am interested in resolving current SNS issues such as fake news, believing that “**digital identity**” is key. The crucial themes are how to control the identity of information publishers in digital worlds like SNS and demonstrate their **trust**. 

In the real world, we can (to a significant degree) judge whether someone is trustworthy based on whether they are a friend, an acquaintance, or a member of a certain organization. However, in the digital world of cyberspace, it is difficult to assess reliability because we often cannot identify who posted the information, and fake accounts even exist.

## Description of the current system

The above theme is a huge issue. I, therefore, concentrate on the little specific project at this development. I developed a system that shows someone’s trust by showing their DID (Decentralized Identity) and VCs (verifiable Credentials). 

The system also verifies that the DID owner is 20 years of age or older using ZKP.  Birthday recorded in driver’s license VC is a private input and Zk-proof the claim using Circom and SnarkJS (Plonk). By implementing this function, the system protects the privacy of VC.

The current development is a simple application, but I want to continue to develop the system that shows someone’s trust by showing DID and VCs, their Web2 activities and Web3 activities, and their social network.

Thus, the developed system, **zkVC**, is a part of a digital identity system that shows trust with privacy protection.

## Development process of the system

### Requirments

- Handling identity with decentralized SSI.
- Supports n:1 relationships with SNS accounts through some method (e.g., embedding within SNS accounts, linking DIDs to SNS user profiles).
- Uses DIDs as human identifiers. Supports n:1 relationships with people via DIDs.
- Utilizes W3C's DID and VC specifications.
- Users manage the scope of privacy disclosure themselves. Use ZKPs to avoid disclosing more information than necessary.
- Possess both identity as a unique key and identity born from social relationships (demonstrating experiences and achievements). The former uses DID. Any DID method is acceptable, but initially use blockchain addresses. The latter, in the Web3 world, refers to NFTs, SBTs, POAPs, etc. In the Web2 world, zkTLS is used to demonstrate Web2 activities. (not implemented at this version)
- To demonstrate relational identity, a social network of digital identities can be displayed.  (not implemented at this version)
- Trustworthiness is calculated and displayed (for each trustworthiness metric) based on the data held.  (not implemented at this version)
- Trustworthiness scores from other services can also be displayed.  (not implemented at this version)
- Features a user-friendly UI/UX based on human-centered design.

Technical requirments:
- DID and VC utilize [“ERC-1056: Ethereum Lightweight Identity”](https://eips.ethereum.org/EIPS/eip-1056) . The DID repository uses the ERC-1056 repository.
- VC linked to NFTs utilize [“ERC-7861: ERC-721 Verifiable Credential Extension”](https://eips.ethereum.org/EIPS/eip-7861) . VC are stored in a location inaccessible to anyone and can only be accessed through system verification and VC publication. (ERC 7861 is not implemented at this version)
- The frontend uses React. An API server is placed between the frontend and the contracts. The contract side uses Foundry.
- Tailwind CSS is used. (Alternatively, Material UI)
- This time, the age information contained within the VC is concealed using zero-knowledge proofs, proving only that the individual is 20 years of age or older.

### Human-Centered Development (UX Deisgn)

As a profssional UX designer, I used a Human-Centered Deisgn to set the following factors:

- Vision: Solve social media issues like fake news and fake accounts using Web3 technology and philosophy.
- Purpose: Focus on trustworthiness, demonstrating the reliability of social media information through human trustworthiness tied to digital identity.
- Concept: Easy to use and conveys trustworthiness.
- Target Users: Social media users. Individuals and society impacted by social media.
- User Needs: Target users utilize this system when they wish to verify the reliability of social media information.
- Surface Design: Use green as the theme color to convey trustworthiness. Employ a soft green to evoke approachability and ease of use. Text color is black. Use red as an accent color. Create a functional design.

### 9-panel UX storyboard

[9-panel UX storyboard](./assets/9panelUXstoryboard.png)

### Prototype design with Figma

According to the requirments, Human-Centered Design, and 9-panel UX storyboard, I design the screen and some functions that must be implemented in the current development.

[design of prototype system](./assets/FigmaPreview2.png) 

## Specific Implementation of zkVC

A privacy-preserving age verification system using zero-knowledge proofs (zk-SNARKs) that proves a user is over 20 years old without revealing their exact birthdate.

## Overview

This system combines Verifiable Credentials (VCs), Circom circuits, and Ethereum smart contracts to create a trustless age verification mechanism that protects user privacy while providing cryptographic proof of age eligibility.

## System Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Verifiable    │    │   Circom Circuit │    │   Ethereum      │
│   Credential    │───▶│   (zk-SNARK)     │───▶│   Smart Contract│
│   (VC.json)     │    │   Age ≥ 20       │    │   Verification  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## Project Structure

```
zkp_vc/
├── circom/                 # Zero-knowledge circuits
│   ├── circuit/           # Circom source files
│   └── work/ageCheck/     # Compiled circuit artifacts
├── contract/              # Ethereum smart contracts
│   ├── AgeVerifier.sol    # Main verification contract
│   └── script/Verifier.sol # Plonk verifier contract
├── vc/                    # Verifiable credentials
│   └── vc.json           # Sample VC with birthdate
├── app/                   # Age verification application
│   └── ageVerification.js # Main verification script
└── web/                   # React frontend demo
    └── src/              # UI components
```

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [Foundry](https://book.getfoundry.sh/getting-started/installation)
- [Circom](https://docs.circom.io/getting-started/installation/)

### 1. Setup

```bash
# Clone and install dependencies
cd app && npm install
cd ../contract && npm install

# Install Foundry dependencies
cd contract && forge install foundry-rs/forge-std
```

### 2. Configure Environment

```bash
# Copy environment template
cp app/.env.example app/.env
cp contract/.env.example contract/.env

# Edit .env files with your Sepolia testnet credentials:
# - RPC_URL: Infura/Alchemy Sepolia endpoint
# - PRIVATE_KEY: Your wallet private key (test wallet only!)
# - ETHERSCAN_API_KEY: For contract verification
```

### 3. Get Sepolia ETH

Visit any Sepolia faucet:
- https://sepoliafaucet.com/
- https://www.alchemy.com/faucets/ethereum-sepolia

### 4. Deploy Contracts

```bash
cd contract
forge build
npm run deploy
# Copy the deployed AgeVerifier address to app/.env
```

### 5. Run Age Verification

```bash
cd app
npm run verify
```

## How It Works

1. **VC Processing**: Extracts birthdate from `vc.json` and converts to Unix timestamp
2. **Proof Generation**: Uses Circom circuit to generate zk-SNARK proof that `today - birthday ≥ 631,238,400` seconds (≈20 years)
3. **On-chain Verification**: Submits proof to Ethereum smart contract using Plonk verifier
4. **Privacy Preservation**: Birthdate remains private; only the boolean result (age ≥ 20) is revealed

## Technical Details

### Circom Circuit (`ageCheck.circom`)
- **Private Input**: `birthday` (Unix timestamp)
- **Public Input**: `today` (Unix timestamp)  
- **Constraint**: Proves `today - birthday ≥ 631,238,400` seconds
- **Security**: Range constraints prevent field overflow attacks

### Smart Contracts
- **PlonkVerifier**: Cryptographic proof verification
- **AgeVerifier**: Business logic, user management, event emission

### Verification Process
```javascript
// 1. Parse VC
const birthdate = vc.credentialSubject.driverLicense.birthDate; // "2000-07-01"
const birthdayUnix = Math.floor(new Date(birthdate).getTime() / 1000);

// 2. Generate proof
const { proof, publicSignals } = await snarkjs.plonk.fullProve({
    birthday: birthdayUnix.toString(),
    today: Math.floor(Date.now() / 1000).toString()
}, wasmPath, zkeyPath);

// 3. Verify on-chain
const success = await ageVerifier.verifyAge(formattedProof, todayUnixTime);
```

## Frontend Demo

The React frontend (`/web`) provides an interactive demo with:
- SNS-style interface showing user profile
- Navigation between different verification screens
- VC display and verification workflow
- Mobile-responsive design

```bash
cd web
npm install
npm run dev
```

## Verification Example

For a user born on `2000-07-01`:
- **Birthdate Unix**: `962409600`
- **Today Unix**: `1757686635` (example)
- **Age in seconds**: `795,277,035`
- **Required threshold**: `631,238,400` (20 years)
- **Result**: ✅ Verified (age ≥ 20)

## Security Considerations

- **Range Constraints**: Prevents malicious inputs that could exploit field arithmetic
- **Trusted Setup**: Uses Powers of Tau ceremony for cryptographic security
- **Private Key Management**: Use test wallets only; never expose production keys
- **Time Validation**: Consider timezone and clock skew in production deployments

## Network Configuration

Currently configured for **Sepolia Testnet**:
- **Chain ID**: 11155111
- **Native Currency**: Sepolia ETH (test tokens)
- **Block Explorer**: https://sepolia.etherscan.io/

## Additional Resources

- [Circom Documentation](https://docs.circom.io/)
- [snarkjs Library](https://github.com/iden3/snarkjs)
- [Foundry Book](https://book.getfoundry.sh/)
- [Verifiable Credentials Specification](https://www.w3.org/TR/vc-data-model/)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Test your changes thoroughly
4. Submit a pull request

## Disclaimer

This is a proof-of-concept implementation. For production use:
- Conduct thorough security audits
- Use production-grade infrastructure
- Implement proper key management
- Consider regulatory compliance requirements

## License

MIT License - see LICENSE file for details.