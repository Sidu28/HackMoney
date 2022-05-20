import { useParams, Link } from "react-router-dom";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import { useState, useMemo, useEffect, useCallback } from "react";
import VoteButton from "./VoteButton.jsx";
const EditView = ({
  contractAddy,
  setContractAddy,
  network,
  setNetwork,
  setStatus,
  status,
  inputs,
}) => {
  const { id } = useParams();
  const [value, setValue] = useState("");
  const [cmInstance, setCmInstance] = useState(null);

  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
    };
  }, []);

  const getCmInstanceCallback = useCallback((editor) => {
    setCmInstance(editor);
  }, []);

  useEffect(() => {
    if (!cmInstance) return;
    cmInstance.doc.clearHistory();
  }, [cmInstance]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setValue(val);
  };

  return (
    <>
      <div className="edit-view">
        <h2>Suggest a description</h2>
        <code style={{ fontWeight: "bold" }}>contractURI → (string)</code>{" "}
        <span>in 0x7408F19f1040ADDf739CEd33A84416265d0B15E4</span>
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
            value={value}
            onChange={handleInputChange}
            placeholder="Enter a description..."
          />

          {/* <SimpleMDE
            value={value}
            onChange={onChange}
            getCodemirrorInstance={getCmInstanceCallback}
          /> */}
        </div>
        <button>Submit</button>
      </div>
      <div className={`function-box`}>
        <VoteButton count="0" />
        <div className={`left-align function-container`}>
          <p className="tiny-text">{`Posted by 0xc0963dc1839993Fc65Fa26cD2f9b6ae5A1515449, 10 hours ago`}</p>
          <div  className="description" >
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
    </>
  );
};

export default EditView;
