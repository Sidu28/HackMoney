import { useParams } from "react-router-dom";

const EditView = ({
  contractAddy,
  setContractAddy,
  network,
  setNetwork,
  setStatus,
  status,
}) => {
  const { id } = useParams();
  return <div>HEY ID: {id}</div>;
};

export default EditView;
