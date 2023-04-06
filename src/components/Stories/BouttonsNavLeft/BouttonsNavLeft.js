import "./BouttonsNavLeft.css";
import { MdArrowBackIos } from "react-icons/md";

export const BouttonsNavLeft = ({ visible, onClicked }) => {
  return (
    <div
      className="BouttonsNavLeft"
      onClick={onClicked}
      style={{ visibility: visible }}
    >
      <MdArrowBackIos />
    </div>
  );
};
