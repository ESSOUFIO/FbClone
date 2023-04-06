import "./BouttonsNavRight.css";
import { MdArrowForwardIos } from "react-icons/md";

export const BouttonsNavRight = ({ onClicked, visible }) => {
  return (
    <div
      className="BouttonsNavRight"
      onClick={onClicked}
      style={{ visibility: visible }}
    >
      <MdArrowForwardIos />
    </div>
  );
};
