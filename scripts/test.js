const { ethers } = require("hardhat");
let deployer;
async function main() {
    [deployer] = await ethers.getSigners();
    const VRFFactory = await ethers.getContractFactory('FunctionSignature', deployer);
    const VRF = await VRFFactory.deploy();
    await VRF.deployed();

    console.log(await VRF._operand());
    let functionSignature = ethers.utils.id('add(uint256)').slice(0, 10);
    let value = 5;
    let bytes = ethers.utils.solidityPack(['bytes4', 'uint256'], [functionSignature, value]);

    const [signer] = await ethers.getSigners();
    let signed = await signer.signTransaction({to: VRF.address, data: bytes})
    
    console.log(signed);
    // await ethers.Signer.sendTransaction({to: VRF.address, data: bytes})
    // console.log(await VRF._operand());
}
main()
