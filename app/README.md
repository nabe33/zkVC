# Age Verification ZKP System

This system verifies that a user is at least 20 years old using zero-knowledge proofs, without revealing their exact birthdate.

## Components

- `ageVerification.js` - Main verification script
- `deploy.js` - Contract deployment script  
- `../contract/AgeVerifier.sol` - Main verification contract
- `../contract/script/Verifier.sol` - Plonk verifier contract
- `../circom/circuit/ageCheck.circom` - Circom circuit for age verification
- `../vc/vc.json` - Verifiable credential containing birthdate

## Setup

1. Install Foundry (if not already installed):
```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

2. Install JavaScript dependencies:
```bash
npm install
```

3. Copy and configure environment:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Set up Foundry project:
```bash
cd ../contract
forge install foundry-rs/forge-std
```

5. Compile the Circom circuit (if not already done):
```bash
cd ../circom/circuit
# Compile ageCheck.circom and generate proving/verification keys
```

6. Get Sepolia testnet ETH:
```bash
# Visit one of these faucets:
# https://sepoliafaucet.com/
# https://www.alchemy.com/faucets/ethereum-sepolia
# https://sepolia-faucet.pk910.de/
```

7. Compile and deploy contracts to Sepolia:
```bash
# Navigate to contract directory
cd ../contract

# Compile contracts
forge build

# Deploy to Sepolia (default)
npm run deploy

# Or run directly with Foundry
forge script script/Deploy.s.sol:DeployScript --rpc-url sepolia --broadcast --verify -vvvv

# For local development only:
# npm run deploy:localhost
```

8. Update CONTRACT_ADDRESS in .env with deployed address from deployment output

## Usage

Run age verification:
```bash
npm run verify
```

Or directly:
```bash
node ageVerification.js
```

## How it Works

1. **Input Processing**: Extracts birthdate from VC JSON and converts to Unix timestamp
2. **Proof Generation**: Uses Circom circuit to generate zk-SNARK proof that age >= 20 years
3. **On-chain Verification**: Submits proof to Solidity contract using Plonk verifier
4. **Result**: Returns boolean indicating successful age verification

## Circuit Details

The `ageCheck.circom` circuit:
- **Private Input**: `birthday` (Unix timestamp)  
- **Public Input**: `today` (Unix timestamp)
- **Logic**: Proves `today - birthday >= 631,238,400` (20 years in seconds with leap days)
- **Security**: Uses range constraints to prevent field overflow attacks

## Contract Interface

```solidity
contract AgeVerifier {
    function verifyAge(uint256[24] calldata proof, uint256 todayUnixTime) external returns (bool)
    function isUserVerified(address user) external view returns (bool)
    function getVerificationTimestamp(address user) external view returns (uint256)
}
```

## Security Considerations

- Private key management: Use hardware wallets or secure key management in production
- Circuit parameters: Ensure trusted setup for production deployment  
- Time validation: Consider time zone and clock skew issues
- Replay protection: Verification timestamps prevent reuse of old proofs

## Testing

The system includes basic validation:
- Parses birthdate from VC format
- Calculates age for debugging
- Generates and verifies proofs
- Handles common error conditions

## Dependencies

### JavaScript
- `snarkjs`: zk-SNARK proof generation and verification
- `ethers`: Ethereum interaction

### Solidity/Foundry
- `forge-std`: Foundry standard library for testing and scripting
- `foundry`: Ethereum development toolkit

### Circuit
- `circomlib`: Circom utility circuits

## Environment Variables

- `RPC_URL`: Sepolia RPC URL (e.g., `https://sepolia.infura.io/v3/YOUR_PROJECT_ID`)
- `PRIVATE_KEY`: Wallet private key (64 hex chars) - **Keep this secure!**
- `CONTRACT_ADDRESS`: Deployed AgeVerifier contract address on Sepolia
- `NETWORK`: Target network name (default: `sepolia`)
- `ETHERSCAN_API_KEY`: Etherscan API key for contract verification

### Getting RPC URL
1. **Infura**: Create account at https://infura.io, create project, copy Sepolia endpoint
2. **Alchemy**: Create account at https://alchemy.com, create app, copy Sepolia URL
3. **Public RPCs**: Use `https://sepolia.gateway.tenderly.co` (rate limited)

## Troubleshooting

1. **Foundry not found**: Make sure Foundry is installed and in your PATH
2. **Compilation fails**: Run `forge install foundry-rs/forge-std` to install dependencies
3. **Proof generation fails**: Check that .wasm and .zkey files exist in circom/circuit/
4. **Contract call fails**: Verify contract address and network configuration
5. **Transaction reverts**: Ensure sufficient gas and valid proof format
6. **Age calculation wrong**: Check date format in VC JSON (should be YYYY-MM-DD)
7. **Deployment fails**: Check RPC_URL and PRIVATE_KEY in .env file