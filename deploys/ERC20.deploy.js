const { ethers } = require("hardhat");

async function main() {
    const [deployer, AOracle, BOracle, consumer] = await ethers.getSigners();
    const DND_TOKEN_FACTORY = await ethers.getContractFactory('DuongndToken', deployer);
    const DND_TOKEN = await DND_TOKEN_FACTORY.deploy();
    await DND_TOKEN.deployed();
    await DND_TOKEN.connect(deployer).transfer(AOracle.address, 1000);
    await DND_TOKEN.connect(deployer).transfer(BOracle.address, 1000);
    await DND_TOKEN.connect(deployer).transfer(consumer.address, 1000);
    console.log(DND_TOKEN.address);   
}
main();

/**
 * DND_TOKEN:   0x53ae4d54427100d4e54089ACd19Fbf1F0e81BD0A
 * deployer:    0x66730b6d33a3cDDfF9B38B680f2B181117F781f5
 * AOracle:     0x45eFc65fF7e9ed85664924633416129Bc340Dcb8
 * BOracle:     0x9Fb0dcaD42e3eBde8D1329a36A3F49dfbCE2141C
 * consumer:    0x89bCbb0ACDa17095329106A0ffFa1Dd9Fc696278
 */