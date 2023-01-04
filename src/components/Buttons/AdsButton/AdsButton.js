import "./AdsButton.css";
import AdsPicture from "../../../assets/images/AdsPicture.jpg";

export const AdsButton = ({ title, website }) => {
  return (
    <div className="AdsButton">
      <img src={AdsPicture} alt="" />
      <div>
        <h6>{title}</h6>
        <p>{website}</p>
      </div>
    </div>
  );
};
