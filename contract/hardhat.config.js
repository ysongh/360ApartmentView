require("@nomicfoundation/hardhat-toolbox");
require("@tableland/hardhat");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  localTableland: {
    silent: false,
    verbose: false,
  },
};
