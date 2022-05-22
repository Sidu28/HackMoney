import { useEffect, useState } from "react";
import ContractFunction from "./ContractFunction.jsx";
import {
  getContractABI,
  initContract,
  getABIFunctions,
  getAllFunctionDescriptions,
  getContractMetadata
} from "../util/interact.js";
import ContractBanner from "./ContractBanner.jsx";

const Contract = ({ address, network, setStatus, status,setSelectedFunc }) => {
  const [abi, setABI] = useState(null);

  const [functions, setFunctions] = useState(null);
  const [contractObj, setContract] = useState(null);

  const [metadata, setMetadata] = useState(null);

  const load = async () => {
    try {
      const abiRes = await getContractABI(address, network);
      setABI(abiRes);
      const funcRes = getABIFunctions(abiRes, address, network);
      const contractRes = await initContract(address, abiRes, network);

      const meta = await getContractMetadata(address);
      setMetadata(meta);
      setContract(contractRes);
      setFunctions(funcRes);
      setStatus("");
    } catch (err) {
      setABI(null);
      setContract(null);
      setMetadata(null);
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

        {contractObj ? (
          <ContractBanner
            name={metadata ? metadata.name : null}
            description={metadata ? metadata.description : null}
            address={address}
            website={metadata ? metadata.website : null}
            docs={metadata ? metadata.docs : null}
          />
        ) : null}

        {functions ? (
          <div className="eight-hundo">
            {Object.keys(functions).map((key, i) => {
              return (
                <ContractFunction
                  key={i}
                  contract={contractObj}
                  contractFuncObj={functions[key]}
                  setSelectedFunc={setSelectedFunc}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Contract;
