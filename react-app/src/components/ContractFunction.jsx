import { useEffect, useState } from "react";
import {
  parseInputs,
  parseOutputsJSX,
  writeFunction,
} from "../util/interact.js";
import StarButton from "./StarButton.jsx";
//https://react-icons.github.io/react-icons

const ContractFunction = ({
  contract,
  constant,
  inputs,
  name,
  outputs,
  payable,
  stateMutability,
  type,
  isRead,
}) => {
  const [response, setResponse] = useState("");
  const [state, setState] = useState({});

  const callFunc = async () => {
    try {
      let res;
      if (isRead) {
        res = await contract.functions[name](...Object.values(state));
      } else {
        const res = await writeFunction(contract, name, state);

        // res = await contract.functions[name](...Object.values(state));
      }
      setResponse(res);
    } catch (err) {
      console.log(err);
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
    <div
      className={`contract-function-div ${
        showFunction ? "function-box" : "function-box"
      }`}
      onClick={() => setShowFunctions(true)}
    >
      {/* function sigantaure */}
      <StarButton />

      <div className={`left-align`}>
        <code className="func-signature">
          {/* function name */}
          <div>
            <span style={{ fontWeight: "800" }}>{name}</span>
            {/* {inputs.map((obj, i) => (
            <span style={{ fontStyle: "code" }}>
              ({obj.type}) {obj.name}
            </span>
          ))} */}{" "}
            → {parseOutputsJSX(outputs)}
          </div>
        </code>
        <div style={{ color: "grey" }}>some longg ass description</div>

        {/* function inputs for read/write */}
        <div className={`left-align ${showFunction ? `show` : "hide"}`}>
          {inputs ? (
            <form>
              {" "}
              {inputs.map((obj, i) => (
                <div key={i}>
                  <code>
                    ({obj.type}) {obj.name}
                  </code>
                  <input onChange={handleInputChange} name={i}></input>
                  {/* <textarea>hello</textarea> */}
                </div>
              ))}
            </form>
          ) : null}
          <button style={{}} onClick={callFunc}>
            {isRead ? "Read" : "Write"}
          </button>
          {response !== "" ? (
            <p style={{ textAlign: "left", fontStyle: "italic" }}>
              Returned: {String(response)}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

// <div className={showFunction ? "hide-function-box" : "function-box"}>
// <code className="func-name" onClick={() => console.log(outputs)}>
//   {name} → {parseOutputsJSX(outputs)}
// </code>
// <div className="function-collapse">
//   {inputs ? (
//     <form>
//       {" "}
//       {inputs.map((obj, i) => (
//         <div className="function-arg" key={i}>
//           <code>
//             ({obj.type}) {obj.name}
//           </code>
//           <input onChange={handleInputChange} name={i}></input>
//         </div>
//       ))}
//     </form>
//   ) : null}
//   <button onClick={callFunc}>Submit</button>
//   {response !== "" ? (
//     <p style={{ textAlign: "left", fontStyle: "italic" }}>
//       Returned: {String(response)}
//     </p>
//   ) : null}
// </div>
// </div>

export default ContractFunction;
