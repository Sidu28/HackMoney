import { useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
const StarButton = ({}) => {
  const [isStarred, setStarred] = useState(false);

  const starClicked = (e) => {
    setStarred(!isStarred);
    //write to ipfs
  };
  return (
    <div className="star-div">
      <button className="star-button" onClick={starClicked}>
        {isStarred ? <BsStarFill /> : <BsStar />}
      </button>
    </div>
  );
};

export default StarButton;
