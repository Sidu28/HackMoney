import { connectWallet, getCurrentWalletConnected } from "../util/interact.js";
import { useEffect } from "react";

const WalletButton = ({ walletAddress, setWallet, setStatus }) => {
  //wallet stuff

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
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>
  );
};

export default WalletButton;
