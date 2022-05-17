require('dotenv').config()
const axios = require("axios");

const keyMap = {
  mainnet: process.env.REACT_APP_ALCHEMY_MAINNET,
  rinkeby: process.env.REACT_APP_ALCHEMY_RINKEBY,
  ropsten: process.env.REACT_APP_ALCHEMY_ROPSTEN,
  goerli: process.env.REACT_APP_ALCHEMY_GOERLI,
  kovan: process.env.REACT_APP_ALCHEMY_KOVAN,
};

const getInternalTxns = async (txAddy, network) => {

  const key = keyMap[network];
  const alchemy = `https://eth-${network}.alchemyapi.io/v2/${key}`;

  try {
    console.log(`Making trace_transaction request for ${txAddy}...`);
    const res = await axios.post(alchemy, {
      jsonrpc: "2.0",
      method: "trace_transaction",
      params: [txAddy],
      id: 1,
    });
    console.log(`Finished trace_transaction`);
    const data = res.data.result;
    
    data.map((obj, i) => {
      console.log(i)
      console.log(obj.type, obj.calltype)
    })

    return data;
  } catch (e) {
    console.log(e.message);
  }
};

(async () => {
  try {
    const res = await getInternalTxns("0x9bad48f228fc2ca341a9b51598fb5246dc9ed61a0e6dd3d0555921b571514441", "mainnet");
   // console.log(res);
  } catch (err) {
    console.error(err.message);
  }
})();
