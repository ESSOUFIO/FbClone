import "./SideButtons.css";
import { Link } from "react-router-dom";

export const SideButtons = ({ image, text, height, toPage, style }) => {
  return (
    <Link to={toPage}>
      <div className="SideButtons">
        <img src={image} alt="" height={height} style={style} />
        <span>{text}</span>
      </div>
    </Link>
  );
};
