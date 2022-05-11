import { useEffect, useState } from "react";
import { getInternalTxns } from "../util/interact";

const Internal = ({ network }) => {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState("No txn data found...");
  const [txID, setTxID] = useState("");

  const load = async () => {
    try {
      const res = await getInternalTxns(txID, network, setMessage);
      console.log(res);
      setData(res);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    load();
  }, [txID]);
  return (
    <>
      <span>Enter Txn ID: </span>
      <input
        className="txn-input"
        value={txID}
        onChange={(e) => setTxID(e.target.value)}
        placeholder="enter txn ID"
      ></input>
      <p>
        (eg. 0x9bad48f228fc2ca341a9b51598fb5246dc9ed61a0e6dd3d0555921b571514441)
      </p>
      {data ? (
        // <>
        //   {data.map((obj, i) => (
        //     <div key={i}>
        //       <code>
        //       {JSON.stringify(obj,null, 2)}
        //       </code>
        //     </div>
        //   ))}
        // </>
        <pre style={{textAlign:"left"}}> {JSON.stringify(data,null, 2)}</pre>
      ) : (
        <p>{message}</p>
      )}
    </>
  );
};

export default Internal;
