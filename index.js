const ethers = require("ethers");
const { abi, bytecode } = require("./foo.json");

const pk = process.env.PK
const rpcUrl = process.env.RPC_URL

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl)
  const wallet = new ethers.Wallet(pk, provider);

  console.log(`Address: ${wallet.address}, nonce: ${await wallet.getTransactionCount()}`);

  const Factory = new ethers.ContractFactory(abi, bytecode, wallet);

  const contract = await Factory.deploy({
    gasPrice: ethers.utils.parseUnits("5", "gwei")
  });

  await contract.deployed()

  console.log("Deployed at:", contract.address);
}

main()
  .catch(console.error)
