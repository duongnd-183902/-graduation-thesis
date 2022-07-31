const { ethers } = require("hardhat");

async function main() {
    const [deployer, AOracle, BOracle, consumer] = await ethers.getSigners();
    const VRFCoordinatorFactory = await ethers.getContractFactory('VRFCoordinator', deployer);
    const VRFCoordinator = await VRFCoordinatorFactory.deploy('0xFF6afB47AcB97A849ba51B20E57438d340EE8fbD', '10', '2');
    await VRFCoordinator.deployed();
    console.log(VRFCoordinator.address);
}
main();

/**
 * VRF Coordinator: 0xFE5725db462CC0a4ACa15FD9317298b1a52582b5
 */