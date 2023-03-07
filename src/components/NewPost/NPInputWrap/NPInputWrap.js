import "./NPInputWrap.css";
import UserPic from "../../../assets/images/profile.png";

export const NPInputWrap = ({ showAddPost }) => {
  return (
    <div className="NPInputWrap">
      <img src={UserPic} alt="" />
      <input
        type="text"
        placeholder="What's on your mind, Omar?"
        onClick={showAddPost}
      />
    </div>
  );
};
