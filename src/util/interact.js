import axios from "axios";


const { ethers } = require("ethers");

export const getContractABI = async (address, network) => {

  let req = `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${process.env.REACT_APP_ETHERSCAN_KEY}`;

  if (network !== "mainnet") {
    req = `https://api-${network}.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${process.env.REACT_APP_ETHERSCAN_KEY}`;
  }
  const abi = await axios.get(req);
  return abi.data.result;
};

//TODO: go back, might be stripping arrays and such which we'll want to index into
export const getABIFunctions = (abi) => {
  const abijson = JSON.parse(abi).filter((elem) => elem.type == "function");
  return abijson;
};

export const initContract = async (address, abi, network) => {


  const mapping = {
    "mainnet": process.env.REACT_APP_ALCHEMY_MAINNET,
    "rinkeby" : process.env.REACT_APP_ALCHEMY_RINKEBY,
    "ropsten" : process.env.REACT_APP_ALCHEMY_ROPSTEN,
    "goerli" : process.env.REACT_APP_ALCHEMY_GOERLI,
    "kovan": process.env.REACT_APP_ALCHEMY_KOVAN
  }
  const key = mapping[network];
  const alchemy = `https://eth-${network}.alchemyapi.io/v2/${key}`;
  console.log(alchemy)
  const customProvider = new ethers.providers.JsonRpcProvider(alchemy);
  const contract = new ethers.Contract(address, abi, customProvider);
  return contract;

  // const mapping = {
  //   "mainnet": "MCkqdWaXvnh1tne6CEG6NXYQEhgA_B9Q",
  //   "rinkeby" : "ElybgFn6H7hx1EfEsGvMKsD-psxb2gsy",
  //   "ropsten" : "Zrit8evhI8bUxgmCIe9Yuw1nE28LK4-Z",
  //   "goerli" : "qkOPUKaZ4CT4gtQSuJP5KS8NVsLxVnHO",
  //   "kovan": "rif7Mgg8iXcTt54n4AG7ZfneepsWPtdn"
  // }
  // const key = mapping[network];
  // const alchemy = `https://eth-${network}.alchemyapi.io/v2/${key}`;
  // console.log(alchemy)
  // const customProvider = new ethers.providers.JsonRpcProvider(alchemy);
  // const contract = new ethers.Contract(address, abi, customProvider);
  // return contract;
};

export const parseInputs = (inputs, ogInputs) => {
  if (ogInputs.size !== inputs.length) return;
  console.log(ogInputs);
  console.log(Object.values(inputs));
  return inputs.values;
};

export const parseOutputsJSX = (outputs) => {
  if (!outputs || outputs.length == 0) {
    return <span style={{ fontStyle: "italic" }}>(none)</span>;
  } else {
    let str = "";
    outputs.map((out) => {
      out.name
        ? (str = str + `${out.name} ${out.type},`)
        : (str = str + `${out.name} ${out.type},`);
    });
    const result = str.slice(1, -1);
    return <span style={{ fontStyle: "italic" }}>({result})</span>;
  }
};
