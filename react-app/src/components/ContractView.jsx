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
      <Contract
        address={contractAddy}
        network={network}
        setStatus={setStatus}
        status={status}
      />
  );
};

export default ContractView;
