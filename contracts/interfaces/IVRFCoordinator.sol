// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IVRFCoordinator {
  function requestRandomness() external returns (uint256);
  function addConsumer(address, uint256) external;
  function removeConsumer(address) external;
  function registerOracle(address, uint256[2] calldata) external;
}