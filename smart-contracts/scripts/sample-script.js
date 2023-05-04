// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const coder = ethers.utils.defaultAbiCoder;

  const order = "0x75537828f2ce51be7289709686A69CbFDbB714F1";
  const [acc] = await ethers.getSigners();
  tx = {
    to: order,
    value: ethers.utils.parseEther('0.012041532339724467')
};

const transaction = await acc.sendTransaction(tx);
const finalReceipt = await transaction.wait();
console.log(finalReceipt)
console.log("Successfuly sent")
console.log("topics: ",finalReceipt.logs[0].topics)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
