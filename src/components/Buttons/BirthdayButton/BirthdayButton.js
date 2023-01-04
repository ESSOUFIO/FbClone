import "./BirthdayButton.css";
import { Link } from "react-router-dom";

export const BirthdayButton = ({ image, text, NbrOther, height, toPage }) => {
  return (
    <Link to={toPage}>
      <div className="BirthdayButton">
        <img src={image} alt="" height={height} />
        <span>
          <b>{text}</b> and <b>{NbrOther}</b> have birthdays today
        </span>
      </div>
    </Link>
  );
};
