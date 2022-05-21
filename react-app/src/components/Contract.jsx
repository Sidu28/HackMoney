import { useEffect, useState } from "react";
import ContractFunction from "./ContractFunction.jsx";
import {
  getContractABI,
  initContract,
  getABIFunctions,
} from "../util/interact.js";
import ContractBanner from "./ContractBanner.jsx";

const Contract = ({ address, network, setStatus, status }) => {
  const [abi, setABI] = useState(null);
  const [description, setDescription] = useState(null);

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

  const fetchDescriptions = async () => {
    return null;
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

        {contractObj ? (
          <ContractBanner
            name={null}
            description={null}
            address={address}
            website={null}
            docs={null}
          />
        ) : null}

        {functions ? (
          <div className="eight-hundo">
            {/* <h2>Functions</h2> */}
            {functions.map((obj, i) => (
              <ContractFunction
                key={i}
                contract={contractObj}
                isRead={
                  obj.stateMutability === "pure" ||
                  obj.stateMutability === "view"
                }
                description={null}
                {...obj}
              />
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Contract;
