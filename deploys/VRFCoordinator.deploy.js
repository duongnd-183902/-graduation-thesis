const { ethers } = require("hardhat");

async function main(){
    const [deployer] = ethers.getSigners();
    const VRFCoordinatorFactory = await ethers.getContractFactory('VRFCoordinator',deployer);
    const VRFCoordinator = await VRFCoordinatorFactory.deploy();
    await VRFCoordinator.deployed();
    console.log(VRFCoordinator.address);
}