const VRF = require('./vrf');
const { proofVRF } = require('./vrf');
const { uint256 } = require('../utils/secp256k1.js');
const { ethers } = require('hardhat');


async function main(){
    let [deployer] = await ethers.getSigners();
    let vrfCoordinator = '0x673D93552c3595C764C8fe59e5F04a3E9Be7C020';
    const VRFCoordinator = await ethers.getContractAt("VRFCoordinator",vrfCoordinator);
    // console.log('sender call coordinator:',await VRFCoordinator.sender());
    let eventSignature = ethers.utils.id('RandomRequested(address)');
    let filter = {};
    filter.topics = Array(eventSignature);
    filter.address = vrfCoordinator;
    ethers.provider.on(filter,(logs)=> {
        let proof = proofVRF(uint256(1));
        VRFCoordinator.fulfillRandomness(proof);
        console.log('success full!')
    })
}
main();
