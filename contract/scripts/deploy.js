// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const Apartment360 = await hre.ethers.getContractFactory("Apartment360");
  const apartment360 = await Apartment360.deploy();
  await apartment360.deployed();
  console.log(`Apartment360 deployed to ${apartment360.address}`);

  const data = {
    "apt_url": "https://bafybeifoiyinmjedoojomzjxsubdzb7hdix7goekm3hn6hevfksax6alg4.ipfs.sphn.link/8b3a7cc973bc0e00d761b01c9ed94580",
    "data_url": "https://bafybeifkfdwrnhmketkd76lz3o6jqvaffqtujdeqwhyfxkuu77hq6mratu.ipfs.sphn.link/5817aaa492dd6df03106d2267615a7a5",
    "location": "NYC",
    "number_of_rooms":"3",
    "price": "2600"
  }

  await apartment360.addApt(data.apt_url, data.data_url, data.number_of_rooms, data.location, data.price);
  console.log(`Apartment #1 is created`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
