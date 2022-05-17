import "./App.css";
import Contract from "./components/Contract";
import { useState, useEffect } from "react";
import {
  getContractABI,
  initContract,
  getABIFunctions,
} from "./util/interact.js";
import Internal from "./components/Internal";
import {
  connectWallet,
  getCurrentWalletConnected,
} from "./util/interact.js";

function App() {
  const [contractAddy, setContractAddy] = useState("");
  const [network, setNetwork] = useState("mainnet");

  //wallet stuff
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  const downloadMetamask = `https://metamask.io/download.html`;

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  // TODO: see if u can move to interact.js
  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the bottom right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={downloadMetamask}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const load = async () => {
    const { address, status } = await getCurrentWalletConnected();
    setWallet(address);
    setStatus(status);
    addWalletListener();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="App">
      {/* <Internal txID="0x9bad48f228fc2ca341a9b51598fb5246dc9ed61a0e6dd3d0555921b571514441" network={network} /> */}
      <div className="search-bar">
        <h2>Contract address: </h2>
        <input
          autoFocus="autofocus"
          className="search-input"
          value={contractAddy}
          onChange={(e) => setContractAddy(e.target.value)}
          placeholder="search any contract address"
        ></input>
      </div>
      <p>{status}</p>

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
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>
      <Contract address={contractAddy} network={network} />
    </div>
  );
}

export default App;
