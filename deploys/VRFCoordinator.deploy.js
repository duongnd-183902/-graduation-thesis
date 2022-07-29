const { ethers } = require("hardhat");

async function main(){
    const [deployer, AOracle, BOracle, consumer] = await ethers.getSigners();
    const VRFCoordinatorFactory = await ethers.getContractFactory('VRFCoordinator',deployer);
    const VRFCoordinator = await VRFCoordinatorFactory.deploy('0x53ae4d54427100d4e54089ACd19Fbf1F0e81BD0A','50','2');
    await VRFCoordinator.deployed();
    console.log(VRFCoordinator.address);
    
}
main();