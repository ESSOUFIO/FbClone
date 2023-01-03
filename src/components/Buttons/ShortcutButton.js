import "./ShortcutButton.css";
import { Link } from "react-router-dom";

export const ShortcutButton = ({ image, text, height, toPage }) => {
  return (
    <Link to={toPage}>
      <div className="ShortcutButton">
        <img src={image} alt="" height={height} />
        <span>{text}</span>
      </div>
    </Link>
  );
};
