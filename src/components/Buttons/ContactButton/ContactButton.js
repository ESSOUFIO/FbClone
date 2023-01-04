import "./ContactButton.css";
import { Link } from "react-router-dom";

export const ContactButton = ({ image, text, height, toPage }) => {
  return (
    <Link to={toPage}>
      <div className="ContactButton">
        <img src={image} alt="" height={height} />
        <span>{text}</span>
      </div>
    </Link>
  );
};
