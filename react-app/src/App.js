import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WalletButton from "./components/WalletButton";
import Contract from "./components/Contract";
import EditView from "./components/EditView";
import Navbar from "./components/Navbar";

function App() {
  const [contractAddy, setContractAddy] = useState("");
  const [network, setNetwork] = useState("mainnet");

  //wallet stuff
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  return (
    <Router>
      <div className="App">
        <Navbar
          contractAddy={contractAddy}
          setContractAddy={setContractAddy}
          network={network}
          setNetwork={setNetwork}
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
              <Contract
                address={contractAddy}
                network={network}
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
