//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import './VRFConsumerBase.sol';
import './VRF.sol';
contract VRFCoordinator is VRF{
    address public sender;
    event RandomRequested(address indexed sender);
    function fulfillRandomness(Proof memory proof) public{
        uint256 randomNumber = VRF.randomValueFromVRFProof(proof, proof.seed);
        VRFConsumerBase(sender).rawFulfillRandom(randomNumber);
    }

    function requestRandomness() public{
        sender = msg.sender;
        emit RandomRequested(msg.sender);
    }
}