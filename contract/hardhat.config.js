require("@nomicfoundation/hardhat-toolbox");
require("@tableland/hardhat");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  localTableland: {
    silent: false,
    verbose: false,
  },
  networks: {
    "filecoin-hyperspace": {
      url: "https://rpc.ankr.com/filecoin_testnet",
      accounts: [process.env.PRIVATEKEY],
    },
  }
};
