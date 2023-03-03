import "./PostHeader.css";
import { TfiMoreAlt } from "react-icons/tfi";
import { VscChromeClose } from "react-icons/vsc";
import { MdOutlinePublic } from "react-icons/md";
import defaultProfile from "../../../assets/images/defaultProfile.png";

const UserProfile = ({ UserName, UserPic, PostTime }) => {
  if (typeof UserPic === "object") {
    UserPic = defaultProfile;
  }

  return (
    <div className="UserProfile">
      <img src={UserPic} alt="" />
      <div className="Text">
        <h6>{UserName}</h6>
        <span>
          {PostTime} . <MdOutlinePublic />
        </span>
      </div>
    </div>
  );
};

export const PostHeader = ({ UserName, UserPic, PostTime }) => {
  return (
    <div className="PostHeader">
      <UserProfile UserName={UserName} UserPic={UserPic} PostTime={PostTime} />
      <div className="d-flex">
        <div className="Button">
          <TfiMoreAlt />
        </div>
        <div className="Button">
          <VscChromeClose />
        </div>
      </div>
    </div>
  );
};
