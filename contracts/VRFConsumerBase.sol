//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

abstract contract VRFConsumerBase {
    address private immutable vrfCoordinator;

    constructor(address _vrfCoordinator) {
        vrfCoordinator = _vrfCoordinator;
    }

    function fulfillRandomness(uint256 requestId, uint256 random) internal virtual;

    function rawFulfillRandom(uint256 requestId, uint256 random) external {
        require(
            vrfCoordinator == msg.sender,
            "VRF Comsumer Base: only vrfCoordinator"
        );
        fulfillRandomness(requestId, random);
    }
}
