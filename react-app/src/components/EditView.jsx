import { useParams, Link } from "react-router-dom";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { setDescription } from "../util/interact.js";

import { useState, useMemo, useEffect, useCallback } from "react";
import VoteButton from "./VoteButton.jsx";
const EditView = ({
  contractAddy,
  network,
  setStatus,
  status,
  inputs,
  selectedFunc
}) => {
  const { id } = useParams();
  const [draftDescription, setDraftDescription] = useState("");

  const handleInputChange = (e) => {
    const val = e.target.value;
    setDraftDescription(val)
  };

  const callSetDescription = async() => {
    console.log("hey sum")
    console.log(draftDescription, contractAddy, network)
    const res = await setDescription(contractAddy, network, draftDescription);
    console.log(res);  
  }

  return (
    <div className="eight-hundo">
      <div className="edit-view">
        <h2>Suggest a description</h2>
        <div>
            <span style={{ fontWeight: "800" }}>{selectedFunc.name}</span> →{" "}
            {selectedFunc.parseOutputsJSX(selectedFunc.outputs)}
          </div>
        {inputs ? (
          <form>
            {" "}
            {inputs.map((obj, i) => (
              <div key={i}>
                <code>
                  ({obj.type}) {obj.name}
                </code>
              </div>
            ))}
          </form>
        ) : null}
        <div className="MDE-div">
          <textarea
            type="textarea"
            value={draftDescription}
            onChange={handleInputChange}
            placeholder="Enter a description..."
          />

          {/* <SimpleMDE
            value={value}
            onChange={onChange}
            getCodemirrorInstance={getCmInstanceCallback}
          /> */}
        </div>
        <button onClick={callSetDescription}>Submit</button>
      </div>
      <div className={`function-box`}>
        <VoteButton count="0" />
        <div className={`left-align function-container`}>
          <p className="tiny-text">{`Posted by 0xc0963dc1839993Fc65Fa26cD2f9b6ae5A1515449, 10 hours ago`}</p>
          <div className="description">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditView;
