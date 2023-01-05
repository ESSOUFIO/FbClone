import "./StorieElement.css";
import { UserPic } from "../";

export const StorieElement = ({ image, name, UserPhoto }) => {
  return (
    <div className="StorieElement" style={{ backgroundImage: `url(${image})` }}>
      <UserPic image={UserPhoto} />
      <p>{name}</p>
    </div>
  );
};
