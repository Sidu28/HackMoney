import { useState } from "react";
import { Link } from "react-router-dom";
import {
  parseOutputsJSX,
  writeFunction,
} from "../util/interact.js";
import StarButton from "./StarButton.jsx";

const ContractFunction = ({
  contract,
  contractFuncObj,
  description,
  setSelectedFunc
}) => {
  const [response, setResponse] = useState("");
  const [state, setState] = useState({});


  const callFunc = async () => {
    try {
      let res;
      if (contractFuncObj.isRead) {
        res = await contract.functions[contractFuncObj.name](...Object.values(state));
        setResponse(res);
      } else {
        res = await writeFunction(contract, contractFuncObj.name, state);
        setResponse(`Transaction hash ${res.hash}`);
      }
    } catch (err) {
      console.log(err);
      setResponse(String(err.message));
    }
  };


  // useEffect(() => {
  // }, [contract]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const openEditView = (e) => {
    setSelectedFunc(contractFuncObj)
  }

  const [showFunction, setShowFunctions] = useState(false);
  return (
    <div
      className={`contract-function-div ${
        showFunction ? "function-box" : "function-box"
      }`}
      onClick={() => setShowFunctions(true)}
    >
      {/* function sigantaure */}
      <StarButton />

      <div className={`left-align function-container`}>
        <code className="func-signature">
          <div>
            <span style={{ fontWeight: "800" }}>{contractFuncObj.name}</span>
            {/* {inputs.map((obj, i) => (
            <span style={{ fontStyle: "code" }}>
              ({obj.type}) {obj.name}
            </span>
          ))} */}{" "}
            → {contractFuncObj.parseOutputsJSX(contractFuncObj.outputs)}
          </div>
        </code>
        <div className="description" style={{ color: "grey" }}>
          {description ? description : "No description found"}
        </div>

        {/* function inputs for read/write */}
        <div className={`left-align ${showFunction ? `show` : "hide"} `}>
          {contractFuncObj.inputs ? (
            <form>
              {" "}
              {contractFuncObj.inputs.map((obj, i) => (
                <div key={i}>
                  <code>
                    ({obj.type}) {obj.name}
                  </code>
                  <input onChange={handleInputChange} name={i}></input>
                </div>
              ))}
            </form>
          ) : null}
          {response !== "" ? (
            <p style={{ textAlign: "left", fontStyle: "italic" }}>
              Returned: {String(response)}
            </p>
          ) : null}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              flexDirection: "row",
              gap: "8px",
            }}
          >
            <button style={{}} onClick={callFunc}>
              {contractFuncObj.isRead ? "Read" : "Write"}
            </button>
            <Link to={`/edit/1`}>
              <button onClick={openEditView}>Suggest</button>
            </Link>
          </div>
        </div>
      </div>
      <p className="tiny-text tag">{contractFuncObj.isRead ? `Read 📖` : `Write 📝`}</p>
    </div>
  );
};

export default ContractFunction;
