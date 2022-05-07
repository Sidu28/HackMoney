import logo from "./logo.svg";
import "./App.css";
import Contract from "./components/Contract";
import { useState } from "react";
import {
  getContractABI,
  initContract,
  getABIFunctions,
} from "./util/interact.js";

function App() {
  const [contractAddy, setContractAddy] = useState("");

  return (
    <div className="App">
      <div className="search-bar">
        <h1>Contract address: </h1>
        <input
          autoFocus="autofocus"
          className="search-input"
          value={contractAddy}
          onChange={(e) => setContractAddy(e.target.value)}
          placeholder="search any contract address"
        ></input>
      </div>
      <Contract address={contractAddy} />
    </div>
  );
}

export default App;
