import { useEffect, useState } from "react";
import { parseInputs, parseOutputsJSX } from "../util/interact.js";

const ContractFunction = ({
  contract,
  constant,
  inputs,
  name,
  outputs,
  payable,
  stateMutability,
  type,
}) => {
  const [response, setResponse] = useState("");
  const [state, setState] = useState({});

  const callFunc = async () => {
    try {
      //parse args

      //   parseInputs(state, inputs)

      const res = await contract.functions[name](...Object.values(state));
      setResponse(res);
    } catch (err) {
      console.log(err)
      setResponse(String(err.message));
    }
  };

  //   useEffect(() => {
  //     console.log(state);
  //   }, [state]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const [showFunction, setShowFunctions] = useState(false);
  // {constant, inputs, name, outputs, payable, stateMutability, type}
  useEffect(() => {});
  return (
    <div className={showFunction ? "hide-function-box" : "function-box"}>
      <code className="func-name" onClick={() => console.log(outputs)}>
        {name} →{" "}
         {parseOutputsJSX(outputs)}
      </code>
      <div className="function-collapse">
        {inputs ? (
          <form>
            {" "}
            {inputs.map((obj, i) => (
              <div className="function-arg" key={i}>
                <code>
                  ({obj.type}) {obj.name}
                </code>
                <input onChange={handleInputChange} name={i}></input>
              </div>
            ))}
          </form>
        ) : null}
        <button onClick={callFunc}>Submit</button>
        {response !== "" ? (
          <p style={{ textAlign: "left" }}>{String(response)}</p>
        ) : null}
      </div>
    </div>
  );
};

export default ContractFunction;
