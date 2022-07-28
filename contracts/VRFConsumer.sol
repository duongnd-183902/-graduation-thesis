//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "./VRFConsumerBase.sol";
import "./VRFCoordinator.sol";

contract VRFConsumer is VRFConsumerBase {
    address public owner;
    address public vrfCoordinator = 0x5FbDB2315678afecb367f032d93F642f64180aa3;
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
