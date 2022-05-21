import axios from "axios";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue, set, get, child } from "firebase/database";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import ContractFunctionObj from "../classes/ContractFunctionObj.js";
const { ethers } = require("ethers");

const keyMap = {
  mainnet: process.env.REACT_APP_ALCHEMY_MAINNET,
  rinkeby: process.env.REACT_APP_ALCHEMY_RINKEBY,
  ropsten: process.env.REACT_APP_ALCHEMY_ROPSTEN,
  goerli: process.env.REACT_APP_ALCHEMY_GOERLI,
  kovan: process.env.REACT_APP_ALCHEMY_KOVAN,
};

const downloadMetamask = "https://metamask.io/download.html";

const firebaseConfig = {
  apiKey: "AIzaSyDZXeUzRW4EGzjr2PJMLVZdyuSxTncSGzE",
  authDomain: "hackmoney-6ef38.firebaseapp.com",
  databaseURL: "https://hackmoney-6ef38-default-rtdb.firebaseio.com/",
  projectId: "hackmoney-6ef38",
  storageBucket: "hackmoney-6ef38.appspot.com",
  messagingSenderId: "703593056992",
  appId: "1:703593056992:web:137854bf0299b2436a9e85",
  measurementId: "G-T8FP3JZE4J",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const getContractABI = async (address, network) => {
  let req = `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${process.env.REACT_APP_ETHERSCAN_KEY}`;

  if (network !== "mainnet") {
    req = `https://api-${network}.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${process.env.REACT_APP_ETHERSCAN_KEY}`;
  }
  const abi = await axios.get(req);
  return abi.data.result;
};

//TODO: go back, might be stripping arrays and such which we'll want to index into
export const getABIFunctions = (abi, contractAddress, network) => {
  try {
    const parsedFunctions = JSON.parse(abi).filter(
      (elem) => elem.type === "function"
    );

    const functions = {};

    for (let i = 0; i < parsedFunctions.length; i++) {
      const obj = parsedFunctions[i];
      const id = getHeaderHash(obj.inputs, obj.name, contractAddress, network);
      const body = new ContractFunctionObj(
        id,
        contractAddress,
        network,
        obj.name,
        obj.inputs,
        obj.outputs,
        obj.stateMutability,
        obj.stateMutability === "pure" || obj.stateMutability === "view"
      );

      // const body = {
      //   "contractAddy": contractAddress,
      //   "network":network,
      //   "name":obj.name,
      //   "inputs":obj.inputs,
      //   "outputs":obj.outputs,
      //   "stateMutability":obj.stateMutability,
      //   "isRead":  obj.stateMutability === "pure" || obj.stateMutability === "view",  
      // };

      functions[id] = body;
    }



    return functions;
  } catch (err) {
    console.log(err.message);
    const e = new Error(String(abi));
    e.name = "FunctionError";
    throw e;
  }
};

export const initContract = async (address, abi, network) => {
  const key = keyMap[network];
  const alchemy = `https://eth-${network}.alchemyapi.io/v2/${key}`;
  const customProvider = new ethers.providers.JsonRpcProvider(alchemy);
  const contract = new ethers.Contract(address, abi, customProvider);
  return contract;
};

export const getInternalTxns = async (txAddy, network, setMessage) => {
  const key = keyMap[network];
  const alchemy = `https://eth-${network}.alchemyapi.io/v2/${key}`;

  try {
    setMessage(`Making trace_transaction request for ${txAddy}...`);
    const res = await axios.post(alchemy, {
      jsonrpc: "2.0",
      method: "trace_transaction",
      params: [txAddy],
      id: 1,
    });
    setMessage(`Finished trace_transaction`);
    return res.data.result;
  } catch (e) {
    setMessage(e.message);
  }
};

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Enter a contract address in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={downloadMetamask}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Enter a contract address in the text-field above.",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the bottom right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={downloadMetamask}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const writeFunction = async (contract, funcName, state) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner(); // TODO, change so don't have to connect on each call
    const newContract = contract.connect(signer);
    const res = await newContract.functions[funcName](...Object.values(state));
    console.log(res);
    return res;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const setDescription = async (selectedFunction, descr) => {
  //const abijson = getABIFunctions(abi);
  const network = selectedFunction.network;
  const contractAddress = selectedFunction.contractAddy;
  const funcName = selectedFunction.name;
  const funcInputs = selectedFunction.inputs;

  let headerHash = getHeaderHash(funcInputs, funcName, contractAddress,network);

  set(ref(db, "Contracts/" + contractAddress + "/functions/" + headerHash), {
        description: descr,
      });

  // let abi = await getContractABI(contractAddress, network);
  // abi = await getABIFunctions(abi);
  // console.log(abi);

  // for (let i = 0; i < abi.length; i++) {
  //   const funcInputs = abi[i].inputs;
  //   const funcName = abi[i].name;
  //   let headerHash = getHeaderHash(funcInputs, funcName, contractAddress,network);

  //   set(ref(db, "Contracts/" + contractAddress + "/functions/" + headerHash), {
  //     description: descr,
  //   });
  // }
};

export const getAllFunctionDescriptions = async (contractAddress) => {
  const funcDescrRef = ref(db);

  try {
    const snapshot = await get(child(funcDescrRef, `Contracts/${contractAddress}/functions`));
    const data = snapshot.val();
    return data;
  } catch (e) {
    console.log(e);
    return e.message;
  }
};

export const getHeaderHash = (funcInputs, name, address, network) => {
  let headerHash = name + address + network;
  for (let j = 0; j < funcInputs.length; j++) {
    headerHash += funcInputs[j].name;
  }
  headerHash = ethers.utils.id(headerHash);
  return headerHash;
};

export const getAddyShorthand = (address) => {
  return (
    String(address).substring(0, 6) + "..." + String(address).substring(38)
  );
};
