

const ethernal = require("hardhat-ethernal");
const hre = require("hardhat");


hre.ethernalSync = true;
hre.ethernalWorkspace = 'Workspace';
    //hre.ethernalTrace = false;
hre.ethernalResetOnStart = 'Hardhat';


async function main() {

const Greeter = await hre.ethers.getContractFactory("Greeter");
const greeter = await Greeter.deploy("Hello, Hardhat!");

await greeter.deployed();

await hre.ethernal.push({
    name: 'Greeter',
    address: greeter.address
})

console.log("Greeter deployed to:", greeter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});



