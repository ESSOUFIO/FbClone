import "./NPInputWrap.css";
import UserPic from "../../../assets/images/profile.png";

export const NPInputWrap = () => {
  return (
    <div className="NPInputWrap">
      <img src={UserPic} alt="" />
      <input type="text" placeholder="What's on your mind, Omar?" />
    </div>
  );
};
