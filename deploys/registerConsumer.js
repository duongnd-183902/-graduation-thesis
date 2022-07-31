const { ethers } = require("hardhat");

async function main(){
    const [deployer, AOracle, BOracle, consumer] = await ethers.getSigners();
    let vrfCoordinator = '0xFE5725db462CC0a4ACa15FD9317298b1a52582b5';
    const VRFCoordinator = await ethers.getContractAt("VRFCoordinator",vrfCoordinator);

    let duongndToken = '0xFF6afB47AcB97A849ba51B20E57438d340EE8fbD';
    const DuongndToken = await ethers.getContractAt("DuongndToken",duongndToken);

    let txApprove = await DuongndToken.connect(consumer).approve(vrfCoordinator,1000);
    await txApprove.wait();

    let txRegisterConsumer = await VRFCoordinator.connect(consumer).addConsumer('0xc86691ba18EA0F10a8E391eB066dDaE77fa3C73a',100);
    await txRegisterConsumer.wait();
    console.log('succesfull');
}
main();