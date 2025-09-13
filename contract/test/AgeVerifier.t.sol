// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../script/Verifier.sol";
import "../AgeVerifier.sol";

contract AgeVerifierTest is Test {
    PlonkVerifier public verifier;
    AgeVerifier public ageVerifier;
    
    address public user1 = address(0x1);
    address public user2 = address(0x2);

    function setUp() public {
        verifier = new PlonkVerifier();
        ageVerifier = new AgeVerifier(address(verifier));
    }

    function testDeployment() public {
        assertEq(address(ageVerifier.verifier()), address(verifier));
    }

    function testVerifyAgeWithMockProof() public {
        // Note: This is a mock test since we don't have real proof data
        // In a real test, you would need to generate actual zk-SNARK proofs
        
        uint256[24] memory mockProof;
        uint256 todayUnixTime = block.timestamp;
        
        // Mock proof data (these would be real proof values in practice)
        for (uint i = 0; i < 24; i++) {
            mockProof[i] = i + 1;
        }

        vm.prank(user1);
        // This will likely fail since it's a mock proof, but tests the interface
        vm.expectRevert(); // Expecting revert due to invalid proof
        ageVerifier.verifyAge(mockProof, todayUnixTime);
    }

    function testUserVerificationStatus() public {
        // Test initial state
        assertFalse(ageVerifier.isUserVerified(user1));
        assertEq(ageVerifier.getVerificationTimestamp(user1), 0);
    }

    function testMultipleUsers() public {
        assertFalse(ageVerifier.isUserVerified(user1));
        assertFalse(ageVerifier.isUserVerified(user2));
    }

    function testVerificationEvent() public {
        uint256[24] memory mockProof;
        uint256 todayUnixTime = block.timestamp;

        // This would need a valid proof to actually emit the event
        vm.expectRevert(); // Mock proof will fail
        vm.prank(user1);
        ageVerifier.verifyAge(mockProof, todayUnixTime);
    }

    // Helper function to test with real proof data (to be used when you have actual proofs)
    function testWithRealProof(uint256[24] memory realProof, uint256 todayUnixTime) public {
        vm.prank(user1);
        bool result = ageVerifier.verifyAge(realProof, todayUnixTime);
        
        if (result) {
            assertTrue(ageVerifier.isUserVerified(user1));
            assertGt(ageVerifier.getVerificationTimestamp(user1), 0);
        }
    }
}