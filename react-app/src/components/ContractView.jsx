import SearchContractBar from "./SearchContractBar";
import Contract from "./Contract";

const ContractView = ({
  contractAddy,
  setContractAddy,
  network,
  setNetwork,
  setStatus,
  status,
}) => {
  return (
    <>
      <SearchContractBar
        contractAddy={contractAddy}
        setContractAddy={setContractAddy}
        network={network}
        setNetwork={setNetwork}
      />
      <Contract
        address={contractAddy}
        network={network}
        setStatus={setStatus}
        status={status}
      />
    </>
  );
};

export default ContractView;
