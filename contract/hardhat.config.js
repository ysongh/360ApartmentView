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

  networks: {
    // npx hardhat run scripts/deploy.js --network filecoin-hyperspace
    "filecoin-hyperspace": {
      url: "https://rpc.ankr.com/filecoin_testnet",
      accounts: [process.env.PRIVATEKEY],
    },
    // npx hardhat run scripts/deploy.js --network filecoin-calibration
    "filecoin-calibration": {
      url: "https://api.calibration.node.glif.io/rpc/v1",
      accounts: [process.env.PRIVATEKEY],
    },
    // npx hardhat run scripts/deploy.js --network mumbai
    "mumbai": {
      url: "https://rpc-mumbai.maticvigil.com/",
      accounts: [process.env.PRIVATEKEY],
    },
  },

  // set the path to compile the contracts
  paths: {
    artifacts: '../client/src/artifacts',
    cache: '../client/src/cache',
  }
};
