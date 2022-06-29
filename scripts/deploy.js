const { ethers } = require("hardhat");
let deployer;
async function log(){
    
    console.log('___VRF Consumer___');
    console.log('owner of comsumer:', await this.VRFConsumer.owner());
    console.log('vrfCoordinator:',await this.VRFConsumer.vrfCoordinator());
    console.log('random number:', await this.VRFConsumer.random());
    console.log('___VRF Coordinator___');
    console.log('sender call coordinator:',await this.VRFCoordinator.sender());
}
async function main(){
    [deployer] = await ethers.getSigners();

    const VRFCoordinatorFactory = await ethers.getContractFactory("VRFCoordinator",deployer);
    this.VRFCoordinator = await VRFCoordinatorFactory.deploy();
    await this.VRFCoordinator.deployed()
    console.log('VRFCoordinator address',this.VRFCoordinator.address);


    const VRFConsumerFactory = await ethers.getContractFactory("VRFConsumer",deployer);
    this.VRFConsumer = await VRFConsumerFactory.deploy();
    await this.VRFConsumer.deployed();
    console.log('VRFConsumer address:', this.VRFConsumer.address);
    
    log();
    
}

main();
