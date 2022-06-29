// const hre = require("hardhat");

const { ethers } = require("hardhat");

// const ethers = hre.ethers;

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
    let vrfConsumer = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
    this.VRFConsumer = await ethers.getContractAt("VRFConsumer",vrfConsumer);
    // await this.VRFConsumer.requestRandom();
    let vrfCoordinator = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
    this.VRFCoordinator = await ethers.getContractAt("VRFCoordinator",vrfCoordinator);
    log();
}



main();