require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  defaultNetwork: 'hardhat',
  solidity: "0.8.0",
  networks: {
    hardhat: {
    },
    rinkeby: {
      url: process.env.URL_RINKEBY,
      accounts: {
        mnemonic: process.env.MNEMONIC,
        count: 10
      }
    },
    mainnet: {
      url: process.env.URL_BINANCE,
      chainId: 56,
      gasPrice: 20000000000,
      accounts: {mnemonic: process.env.MNEMONIC}
    }
  }
};