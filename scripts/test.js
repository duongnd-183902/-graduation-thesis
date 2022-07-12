const { ethers } = require("hardhat");
const proofVRF = require('../core/vrf');
const { uint256 } = require("../utils/secp256k1");
let deployer;
async function main(){
    [deployer] = await ethers.getSigners();
    const VRFFactory = await ethers.getContractFactory('VRF',deployer);
    const VRF = await VRFFactory.deploy();
    await VRF.deployed();
    
    let proof = proofVRF.proofVRF(uint256(1));
    console.log(proof)
    let output = await VRF.randomValueFromVRFProof(proof,proof.seed);
    console.log(output)
}
main()
