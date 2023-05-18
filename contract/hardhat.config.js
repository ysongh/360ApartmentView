require("@nomicfoundation/hardhat-toolbox");
require("@tableland/hardhat");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  // npx hardhat node --network local-tableland
  // npx hardhat run scripts/deploy.js --network localhost
  localTableland: {
    silent: false,
    verbose: false,
  },

  // npx hardhat run scripts/deploy.js --network filecoin-hyperspace
  networks: {
    "filecoin-hyperspace": {
      url: "https://rpc.ankr.com/filecoin_testnet",
      accounts: [process.env.PRIVATEKEY],
    },
  },

  // set the path to compile the contracts
  paths: {
    artifacts: '../client/src/artifacts',
    cache: '../client/src/cache',
  }
};
