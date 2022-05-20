import { useState } from "react";
import {
  BsFillCaretUpFill,
  BsCaretUp,
  BsFillCaretDownFill,
  BsCaretDown,
} from "react-icons/bs"; //https://react-icons.github.io/react-icons

const VoteButton = ({ count }) => {
  const [isUpvoted, setUpvote] = useState(false);
  const [isDownvoted, setDownvote] = useState(false);

  const upClicked = (e) => {
    if (isDownvoted) {
      setDownvote(false);
    }
    setUpvote(!isUpvoted);
    //write to ipfs
  };

  const downClicked = (e) => {
    if (isUpvoted) {
      setUpvote(false);
    }
    setDownvote(!isDownvoted);
    //write to ipfs
  };
  return (
    <div className="star-div">
      <button className="star-button" onClick={upClicked}>
        {isUpvoted ? <BsFillCaretUpFill /> : <BsCaretUp />}
      </button>
      <span style={{fontWeight:"700"}}>{count}</span>
      <button className="star-button" onClick={downClicked}>
        {isDownvoted ? <BsFillCaretDownFill /> : <BsCaretDown />}
      </button>
    </div>
  );
};

export default VoteButton;
