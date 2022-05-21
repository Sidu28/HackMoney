import SearchContractBar from "./SearchContractBar";
import WalletButton from "./WalletButton";

const Navbar = ({
  contractAddy,
  setContractAddy,
  network,
  setNetwork,
  walletAddress,
  setWallet,
  setStatus,
}) => {
  return (
    <div className="navbar">
      <div className="navbar-items-div">
        <SearchContractBar
          contractAddy={contractAddy}
          setContractAddy={setContractAddy}
          network={network}
          setNetwork={setNetwork}
        />
        <WalletButton
          walletAddress={walletAddress}
          setWallet={setWallet}
          setStatus={setStatus}
        />
      </div>
    </div>
  );
};

export default Navbar;
