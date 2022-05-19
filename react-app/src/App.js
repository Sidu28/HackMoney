import Contract from "./components/Contract";
import { useState, useEffect } from "react";
import {
  getContractABI,
  initContract,
  getABIFunctions,
} from "./util/interact.js";
import Internal from "./components/Internal";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WalletButton from "./components/WalletButton";
import SearchContractBar from "./components/SearchContractBar";

function App() {
  const [contractAddy, setContractAddy] = useState("");
  const [network, setNetwork] = useState("mainnet");

  //wallet stuff
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  return (
    <Router>
      <div className="App">
        {/* <Internal txID="0x9bad48f228fc2ca341a9b51598fb5246dc9ed61a0e6dd3d0555921b571514441" network={network} /> */}
        <WalletButton
          walletAddress={walletAddress}
          setWallet={setWallet}
          setStatus={setStatus}
        />

        <SearchContractBar
          contractAddy={contractAddy}
          setContractAddy={setContractAddy}
          network={network}
          setNetwork={setNetwork}
        />
        <Contract
          address={contractAddy}
          network={network}
          setStatus={setStatus}
        />
        <span style={{textAlign:"center", padding: "50px", color:"grey"}}>{status}</span>

      </div>
    </Router>
  );
}

export default App;
