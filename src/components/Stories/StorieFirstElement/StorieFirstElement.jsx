import "./StorieFirstElement.css";
import { BsPlusLg } from "react-icons/bs";

export const StorieFirstElement = ({ uid, UserPhoto, showAddPost }) => {
  return (
    <div className="StorieFirstElement" onClick={showAddPost}>
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
