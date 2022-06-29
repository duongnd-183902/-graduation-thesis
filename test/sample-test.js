const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Duongnd", function () {
  it("Duongnd test read public storage hardhat", async function () {
    let [deployer] = await ethers.getSigners();
    const Greeter = await ethers.getContractFactory("VRFConsumer");
    const greeter = await Greeter.deploy();
    await greeter.deployed();
    console.log(await greeter.owner());
    expect(await greeter.owner()).to.equal(deployer.address);
  });
});
