//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "../interfaces/VRFConsumerBase.sol";
import "../VRFCoordinator.sol";

contract VRFConsumer is VRFConsumerBase {
    address public owner;
    address public vrfCoordinator = 0xFE5725db462CC0a4ACa15FD9317298b1a52582b5;
    uint256 public random;
    uint256 public requestId;

    constructor() VRFConsumerBase(vrfCoordinator) {
        owner = msg.sender;
    }

    function fulfillRandomness(uint256, uint256 randomNumber)
        internal
        override
    {
        random = randomNumber;
    }

    function requestRandomness() public {
        requestId = VRFCoordinator(vrfCoordinator).requestRandomness();
    }
}
