import { useEffect, useState, useCallback } from "react";
import ContractFunction from "./ContractFunction.jsx";
import {
  getContractABI,
  initContract,
  getABIFunctions,
} from "../util/interact.js";

const Contract = ({ address, network, setStatus }) => {
  const [abi, setABI] = useState(null);
  const [functions, setFunctions] = useState(null);
  const [contractObj, setContract] = useState(null);


  const load = async () => {
    try {
      const abiRes = await getContractABI(address, network);
      setABI(abiRes);
      const funcRes = getABIFunctions(abiRes);
      const contractRes = await initContract(address, abiRes, network);
      setContract(contractRes)
      setFunctions(funcRes);
      setStatus("");
    } catch (err) {
      setABI(null);
      setContract(null)
      setFunctions(null)
      setStatus(err.message);
      console.log(err)
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
        {functions ? (
          <>
            <h2>Read functions</h2>
            {functions
              .filter(
                (elem) =>
                  elem.stateMutability === "pure" ||
                  elem.stateMutability === "view"
              )
              .map((obj, i) => (
                <ContractFunction key={i} contract={contractObj} isRead={true} {...obj} />
              ))}
          </>
        ) : null}
      </div>

      <div>
        {functions ? (
          <>
            <h2>Write functions</h2>
            {functions
              .filter(
                (elem) =>
                  elem.stateMutability !== "pure" &&
                  elem.stateMutability !== "view"
              )
              .map((obj, i) => (
                <ContractFunction key={i} contract={contractObj} isRead={false} {...obj}  />
              ))}
          </>
        ) : null}
      </div>
    </>
  );
};

export default Contract;
