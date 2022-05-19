import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WalletButton from "./components/WalletButton";
import ContractView from "./components/ContractView";
import EditView from "./components/EditView";

function App() {
  const [contractAddy, setContractAddy] = useState("");
  const [network, setNetwork] = useState("mainnet");

  //wallet stuff
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  return (
    <Router>
      <div className="App">
        <WalletButton
          walletAddress={walletAddress}
          setWallet={setWallet}
          setStatus={setStatus}
        />

        {/* TODO: look into <Link to=""> to prevent extra server reqs with routing: https://www.youtube.com/watch?v=DO-pSysGItQ */}
        <Routes>
          <Route
            exact
            path="/"
            element={
              <ContractView
                contractAddy={contractAddy}
                setContractAddy={setContractAddy}
                network={network}
                setNetwork={setNetwork}
                setStatus={setStatus}
                status={status}
              />
            }
          />
          <Route
            exact
            path="/edit/:id"
            element={
              <EditView
                contractAddy={contractAddy}
                setContractAddy={setContractAddy}
                network={network}
                setNetwork={setNetwork}
                setStatus={setStatus}
                status={status}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
