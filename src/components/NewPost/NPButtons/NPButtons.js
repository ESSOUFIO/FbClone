import "./NPButtons.css";
import { Link } from "react-router-dom";

export const NPButtons = ({ image, text, height, toPage }) => {
  return (
    <Link to={toPage} className="NPButtons">
      <img src={image} alt="" height={height} />
      <span>{text}</span>
    </Link>
  );
};
