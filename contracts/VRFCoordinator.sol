//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "./VRFConsumerBase.sol";
import "./VRF.sol";

contract VRFCoordinator is VRF {
    // address private sender;
    mapping(address => uint256) nonces;
    event RandomRequested(
        address indexed sender,
        uint256 indexed requestId,
        uint256 preeSeed
    );

    function fulfillRandomness(Proof memory proof, address requester) public {
        uint256 requestId = uint256(keccak256(abi.encode(proof.seed)));
        nonces[requester]++;
 
        uint256 randomNumber = VRF.randomValueFromVRFProof(proof, proof.seed);
        VRFConsumerBase(requester).rawFulfillRandom(requestId, randomNumber);
    }

    function requestRandomness() public returns (uint256) {
        (uint256 requestId, uint256 preSeed) = computeRequestId(
            nonces[msg.sender],
            msg.sender
        );
        emit RandomRequested(msg.sender, requestId, preSeed);
        return requestId;
    }

    function computeRequestId(uint256 nonce, address sender)
        private
        pure
        returns (uint256, uint256)
    {
        uint256 preSeed = uint256(keccak256(abi.encode(nonce, sender)));
        return (uint256(keccak256(abi.encode(preSeed))), preSeed);
    }
}
