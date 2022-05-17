import logo from "./logo.svg";
import "./App.css";
import Contract from "./components/Contract";
import { useState } from "react";
import {
  getContractABI,
  initContract,
  getABIFunctions,
} from "./util/interact.js";
import Internal from "./components/Internal";

function App() {
  const [contractAddy, setContractAddy] = useState("");
  const [network, setNetwork] = useState("mainnet");



  return (
    <div className="App">
      {/* <Internal txID="0x9bad48f228fc2ca341a9b51598fb5246dc9ed61a0e6dd3d0555921b571514441" network={network} /> */}
      <div className="search-bar">
        <h1>Contractadf address: </h1>
        <input
          autoFocus="autofocus"
          className="search-input"
          value={contractAddy}
          onChange={(e) => setContractAddy(e.target.value)}
          placeholder="search any contract address"
        ></input>
      </div>
        <label>
          Select a network: 
          <select value={network} onChange={(e) => setNetwork(e.target.value)}>
            <option value="mainnet">Mainnet</option>
            <option value="goerli">Goerli</option>
            <option value="kovan">Kovan</option>
            <option value="rinkeby">Rinkeby</option>
            <option value="ropsten">Ropsten</option>

          </select>
        </label>
      <Contract address={contractAddy} network={network}/>
    </div>
  );
}

export default App;
