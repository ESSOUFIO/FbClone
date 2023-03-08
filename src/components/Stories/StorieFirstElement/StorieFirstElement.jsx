import "./StorieFirstElement.css";
import { BsPlusLg } from "react-icons/bs";

export const StorieFirstElement = ({ UserPhoto }) => {
  return (
    <div className="StorieFirstElement">
      <div
        className="image"
        style={{ backgroundImage: `url(${UserPhoto})` }}
      ></div>
      <div className="FirstStoryBtn">
        <BsPlusLg />
      </div>
      <p>Create story</p>
    </div>
  );
};
