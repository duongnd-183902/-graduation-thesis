//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import './VRFConsumerBase.sol';
contract VRFCoordinator{
    address public sender;
    uint256 public value = 7;
    event Transfer(address indexed sender, address indexed to, uint256 amount);
    event RandomRequested(address indexed sender);
    function fulfillRandom() public{
        VRFConsumerBase(sender).rawFulfillRandom(value);
    }
    function requestRandom() public{
        sender = msg.sender;
        emit RandomRequested(msg.sender);
        emit Transfer(sender, address(this), value);
    }
}