// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../script/Verifier.sol";
import "../AgeVerifier.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);

        // Deploy PlonkVerifier first
        PlonkVerifier verifier = new PlonkVerifier();
        console.log("PlonkVerifier deployed to:", address(verifier));

        // Deploy AgeVerifier with PlonkVerifier address
        AgeVerifier ageVerifier = new AgeVerifier(address(verifier));
        console.log("AgeVerifier deployed to:", address(ageVerifier));

        vm.stopBroadcast();

        console.log("\n=== Deployment Complete ===");
        console.log("Network:", vm.envOr("NETWORK", string("sepolia")));
        console.log("PlonkVerifier:", address(verifier));
        console.log("AgeVerifier:", address(ageVerifier));
        console.log("Deployer:", msg.sender);
        console.log("Block number:", block.number);
        console.log("Chain ID:", block.chainid);
        
        console.log("\n=== Next Steps ===");
        console.log("1. Update your .env file with:");
        console.log("   CONTRACT_ADDRESS=", address(ageVerifier));
        console.log("2. Verify contracts on Etherscan (if not auto-verified):");
        console.log("   forge verify-contract");
        console.log("     ", address(verifier));
        console.log("     script/Verifier.sol:PlonkVerifier --chain sepolia");
        console.log("   forge verify-contract");
        console.log("     ", address(ageVerifier));
        console.log("     AgeVerifier.sol:AgeVerifier --chain sepolia");
        console.log("     --constructor-args");
        console.logBytes(abi.encode(address(verifier)));
        console.log("3. Fund your wallet with Sepolia ETH from faucets:");
        console.log("   - https://sepoliafaucet.com/");
        console.log("   - https://www.alchemy.com/faucets/ethereum-sepolia");
        console.log("4. Test the age verification system with the JavaScript app");
    }
}