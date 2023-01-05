import "./BouttonsNavLeft.css";
import { MdArrowBackIos } from "react-icons/md";

export const BouttonsNavLeft = (props) => {
  return (
    <div className="BouttonsNavLeft" style={{ visibility: props.visible }}>
      <MdArrowBackIos />
    </div>
  );
};
