//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
contract TestContract {
    struct Person{
        uint256[2] id;
        address[2] owner;
    }
    address public owner;
    uint256 public id;
    function set(Person memory person) public {
        owner = person.owner[1];
        id = person.id[1];
    }
}