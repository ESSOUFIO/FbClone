import "./StorieFirstElement.css";
import { BsPlusLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export const StorieFirstElement = ({ uid, UserPhoto }) => {
  const navigate = useNavigate();
  return (
    <div className="StorieFirstElement">
      <div
        className="image"
        style={{ backgroundImage: `url(${UserPhoto})` }}
        onClick={() => navigate(`/profile/${uid}`)}
      ></div>
      <div className="FirstStoryBtn">
        <BsPlusLg />
      </div>
      <p>Create story</p>
    </div>
  );
};
