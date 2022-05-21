import axios from "axios";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

const { ethers } = require("ethers");

const keyMap = {
  mainnet: process.env.REACT_APP_ALCHEMY_MAINNET,
  rinkeby: process.env.REACT_APP_ALCHEMY_RINKEBY,
  ropsten: process.env.REACT_APP_ALCHEMY_ROPSTEN,
  goerli: process.env.REACT_APP_ALCHEMY_GOERLI,
  kovan: process.env.REACT_APP_ALCHEMY_KOVAN,
};

console.log("API KEY", process.env.REACT_APP_ETHERSCAN_KEY);

const downloadMetamask = "https://metamask.io/download.html";

const firebaseConfig = {
  apiKey: "AIzaSyDZXeUzRW4EGzjr2PJMLVZdyuSxTncSGzE",
  authDomain: "hackmoney-6ef38.firebaseapp.com",
  projectId: "hackmoney-6ef38",
  storageBucket: "hackmoney-6ef38.appspot.com",
  messagingSenderId: "703593056992",
  appId: "1:703593056992:web:137854bf0299b2436a9e85",
  measurementId: "G-T8FP3JZE4J",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

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
  try {
    const abijson = JSON.parse(abi).filter((elem) => elem.type === "function");
    return abijson;
  } catch {
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

export const parseInputs = (inputs, ogInputs) => {
  if (ogInputs.size !== inputs.length) return;
  return inputs.values;
};

export const parseOutputsJSX = (outputs) => {
  if (!outputs || outputs.length === 0) {
    return <span style={{ fontStyle: "italic" }}>(none)</span>;
  } else {
    let str = "";
    // outputs.map((out) => {
    //   out.name
    //     ? (str = str + `${out.name} ${out.type},`)
    //     : (str = str + `${out.name} ${out.type},`);
    // });

    outputs.map((out) => {
      str = str + ` ${out.type},`;
    });

    let result = str.slice(0, -1);
    if (result.charAt(0) === " ") {
      result = result.slice(1);
    }

    return <span style={{ fontStyle: "italic" }}>({result})</span>;
  }
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

export const setDescription = async (contractAddress, funcHeader, descr) => {
  try {
    const databaseHash = ethers.utils.id(
      contractAddress.concat("", funcHeader)
    );
    var functionDescriptions = db.collection("function descriptions");

    functionDescriptions.doc(databaseHash).set({
      description: descr,
    });
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const getDescription = async (contractAddress, funcHeader) => {
  const databaseHash = ethers.utils.id(contractAddress.concat("", funcHeader));
  var functionDescriptions = db
    .collection("function descriptions")
    .doc(databaseHash);

  functionDescriptions
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        return doc.data();
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
};

export const getAddyShorthand = (address) => {
  return (
    String(address).substring(0, 6) + "..." + String(address).substring(38)
  );
};
