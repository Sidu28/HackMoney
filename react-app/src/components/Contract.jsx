import { useEffect, useState } from "react";
import ContractFunction from "./ContractFunction.jsx";
import {
  getContractABI,
  initContract,
  getABIFunctions,
} from "../util/interact.js";

const Contract = ({ address, network, setStatus, status }) => {
  const [abi, setABI] = useState(null);
  const [functions, setFunctions] = useState(null);
  const [contractObj, setContract] = useState(null);

  const load = async () => {
    try {
      const abiRes = await getContractABI(address, network);
      setABI(abiRes);
      const funcRes = getABIFunctions(abiRes);
      const contractRes = await initContract(address, abiRes, network);
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

        {functions ? (
          <>
            <h2>Functions</h2>
            {functions
              .map((obj, i) => (
                <ContractFunction
                  key={i}
                  contract={contractObj}
                  isRead={obj.stateMutability === "pure" ||
                  obj.stateMutability === "view"}
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
