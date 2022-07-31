const { ethers } = require("hardhat");

async function main() {
    const [deployer, AOracle, BOracle, consumer] = await ethers.getSigners();
    const VRFConsumerFactory = await ethers.getContractFactory('VRFConsumer', deployer);
    const VRFConsumer = await VRFConsumerFactory.deploy();
    await VRFConsumer.deployed();
    console.log(VRFConsumer.address);
}
main();

/**
 * VRFConsumer: 0xc86691ba18EA0F10a8E391eB066dDaE77fa3C73a
 */