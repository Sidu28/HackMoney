import { useEffect, useState } from "react";
import ContractFunction from "./ContractFunction.jsx";
import {
  getContractABI,
  initContract,
  getABIFunctions,
  getContractDescription,
} from "../util/interact.js";

const Contract = ({ address, network, setStatus, status }) => {
  const [abi, setABI] = useState(null);
  const [functions, setFunctions] = useState(null);
  const [contractObj, setContract] = useState(null);
  const [funcDescr, setFuncDescr] = useState(null);

  const load = async () => {
    try {
      const abiRes = await getContractABI(address, network);
      setABI(abiRes);
      const funcRes = getABIFunctions(abiRes);
      const contractRes = await initContract(address, abiRes, network);
      const funcDescr = await getContractDescription(address);
      setFuncDescr(funcDescr);
      setContract(contractRes);
      setFunctions(funcRes);
      setStatus("");
    } catch (err) {
      setABI(null);
      setContract(null);
      setFunctions(null);
      setStatus(err.message);
      console.log(err);
    }
  };

  useEffect(() => {
    load();
    // console.log()
    // console.log(address)
    // console.log(network)
  }, [address, network]); // includes empty dependency array

  return (
    <>
      <div>
        {status ? (
          <p
            style={{
              margin: "auto",
              textAlign: "center",
              padding: "30px",
              color: "grey",
            }}
          >
            {status}
          </p>
        ) : null}

        <div className="contract-banner">
          <h2>EpicArt (0xbe59...cd0)</h2>
          <div>
            <p>
              ✏️ Creator:{" "}
              <span style={{ fontWeight: "bold" }}>
                0xbe59794dd2101b6f4313a28c0c2b99eae4c92cd0
              </span>
            </p>
            <p>
              💰 Bounty: <span style={{ fontWeight: "bold" }}>10 ETH</span>
            </p>
            <p>TODO: ask Sid what is relevant here</p>
          </div>
        </div>

        {functions ? (
          <>
            {/* <h2>Functions</h2> */}
            {functions.map((obj, i) => (
              <ContractFunction
                key={i}
                contract={contractObj}
                isRead={
                  obj.stateMutability === "pure" ||
                  obj.stateMutability === "view"
                }
                description={funcDescr}
                {...obj}
              />
            ))}
          </>
        ) : null}
      </div>
    </>
  );
};

export default Contract;
