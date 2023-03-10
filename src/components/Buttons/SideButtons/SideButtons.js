import "./SideButtons.css";
import { Link } from "react-router-dom";

export const SideButtons = ({ image, text, height, toPage }) => {
  return (
    <Link to={toPage}>
      <div className="SideButtons">
        <img
          src={image}
          alt=""
          height={height}
          style={{ borderRadius: "100%" }}
        />
        <span>{text}</span>
      </div>
    </Link>
  );
};
