import "./PostHeader.css";
import { TfiMoreAlt } from "react-icons/tfi";
import { VscChromeClose } from "react-icons/vsc";
import { MdOutlinePublic } from "react-icons/md";
import ProfilePic from "../../../assets/images/defProfile.jpg";
import { useEffect, useState } from "react";
import { getUploadedProfilePic } from "../../../firebase/user";

const UserProfile = ({ uid, UserName, PostTime }) => {
  const [imageUrl, setImageUrl] = useState(ProfilePic);

  useEffect(() => {
    getUploadedProfilePic(uid).then((URL) => {
      !!URL && setImageUrl(URL);
    });
  }, [uid]);

  return (
    <div className="UserProfile">
      <img src={imageUrl} alt="" />
      <div className="Text">
        <h6>{UserName}</h6>
        <span>
          {PostTime} . <MdOutlinePublic />
        </span>
      </div>
    </div>
  );
};

export const PostHeader = ({ uid, UserName, UserPic, PostTime }) => {
  return (
    <div className="PostHeader">
      <UserProfile
        uid={uid}
        UserName={UserName}
        UserPic={UserPic}
        PostTime={PostTime}
      />
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
