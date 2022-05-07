import axios from "axios";

const { ethers } = require("ethers");

const alchemy = "https://eth-mainnet.alchemyapi.io/v2/MCkqdWaXvnh1tne6CEG6NXYQEhgA_B9Q";
const customProvider = new ethers.providers.JsonRpcProvider(alchemy);

export const getContractABI = async(address) => {
   const req = `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=JMNU3HE3WZIGNNYIU7Z9T53MQ3XS5DBAPE`;
   const abi = await axios.get(req);
   return abi.data.result;
}

//TODO: go back, might be stripping arrays and such which we'll want to index into
export const getABIFunctions = (abi) => {
  const abijson = JSON.parse(abi).filter( elem => elem.type =="function");
  return abijson
}

export const initContract = async(address, abi) => {
  const contract = new ethers.Contract(address, abi, customProvider);
  return contract;
}

export const parseInputs = (inputs, ogInputs) => {
  if (ogInputs.size !== inputs.length) return;
  console.log(ogInputs);
  console.log(Object.values(inputs))
  return inputs.values;
}
