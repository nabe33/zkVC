// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./script/Verifier.sol";

contract AgeVerifier {
    PlonkVerifier public immutable verifier;
    
    event AgeVerified(address indexed user, bool isOver20, uint256 timestamp);
    
    mapping(address => bool) public verifiedUsers;
    mapping(address => uint256) public verificationTimestamp;
    
    constructor(address _verifier) {
        verifier = PlonkVerifier(_verifier);
    }
    
    function verifyAge(
        uint256[24] calldata proof,
        uint256 todayUnixTime
    ) external returns (bool) {
        uint256[1] memory publicSignals = [todayUnixTime];
        
        bool isValid = verifier.verifyProof(proof, publicSignals);
        
        if (isValid) {
            verifiedUsers[msg.sender] = true;
            verificationTimestamp[msg.sender] = block.timestamp;
            emit AgeVerified(msg.sender, true, block.timestamp);
        }
        
        return isValid;
    }
    
    function isUserVerified(address user) external view returns (bool) {
        return verifiedUsers[user];
    }
    
    function getVerificationTimestamp(address user) external view returns (uint256) {
        return verificationTimestamp[user];
    }
}