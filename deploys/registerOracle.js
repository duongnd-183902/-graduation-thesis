const { ethers } = require("hardhat");
const { uint256 } = require("../utils/secp256k1");
const ECDSA = require('../utils/secp256k1');


async function main(){
    const [deployer, AOracle, BOracle, consumer] = await ethers.getSigners();
    let vrfCoordinator = '0xFE5725db462CC0a4ACa15FD9317298b1a52582b5';
    const VRFCoordinator = await ethers.getContractAt("VRFCoordinator",vrfCoordinator);

    const GX = ECDSA.GX;
    const GY = ECDSA.GY;
    const PRIVATE_KEY_A = uint256(process.env.PRIVATE_KEY_A);
    let PUBLIC_KEY_A = ECDSA.affineECMul(PRIVATE_KEY_A, [GX, GY])
    PUBLIC_KEY_A = ['0x' + PUBLIC_KEY_A[0].toString('hex'), '0x' + PUBLIC_KEY_A[1].toString('hex')];


    const PRIVATE_KEY_B = uint256(process.env.PRIVATE_KEY_B);
    let PUBLIC_KEY_B = ECDSA.affineECMul(PRIVATE_KEY_B, [GX, GY])
    PUBLIC_KEY_B = ['0x' + PUBLIC_KEY_B[0].toString('hex'), '0x' + PUBLIC_KEY_B[1].toString('hex')];

    let registerAOracle = await VRFCoordinator.connect(deployer).registerOracle(AOracle.address,PUBLIC_KEY_A);
    await registerAOracle.wait();
    let registerBOracle = await VRFCoordinator.connect(deployer).registerOracle(BOracle.address,PUBLIC_KEY_B);
    await registerBOracle.wait();
}   

main();