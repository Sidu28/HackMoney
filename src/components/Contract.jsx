import { useEffect, useState, useCallback } from "react";
import ContractFunction from "./ContractFunction.jsx";
import {
  getContractABI,
  initContract,
  getABIFunctions,
} from "../util/interact.js";

const Contract = ({ address }) => {
  const [abi, setABI] = useState(null);
  const [functions, setFunctions] = useState(null);
  const [contractObj, setContract] = useState(null);


  const load = async () => {
    try {
      const abiRes = await getContractABI(address);
      const funcRes = getABIFunctions(abiRes);
      const contractRes = await initContract(address, abiRes);
      setContract(contractRes)
      setABI(abiRes);
      setFunctions(funcRes);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    load();
  }, [address]); // includes empty dependency array

  return (
    <>
      <ol>
        {functions ? (
          <>
            <h2>Read functions</h2>
            {functions
              .filter(
                (elem) =>
                  elem.stateMutability == "pure" ||
                  elem.stateMutability == "view"
              )
              .map((obj, i) => (
                <ContractFunction key={i} contract={contractObj} {...obj} />
              ))}
          </>
        ) : null}
      </ol>

      <ol>
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
                <ContractFunction key={i} contract={contractObj} {...obj}  />
              ))}
          </>
        ) : null}
      </ol>
    </>
  );
};

export default Contract;
