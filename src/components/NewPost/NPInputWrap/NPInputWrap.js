import "./NPInputWrap.css";
import { useNavigate } from "react-router-dom";
import defaultPic from "../../../assets/images/defProfile.jpg";
import { NPButtons } from "../NPButtons/NPButtons";
import PostPhoto from "../../../assets/images/PostPhoto.png";

export const NPInputWrap = ({ showAddPost, userDoc, isMobileSmall }) => {
  const navigate = useNavigate();
  return (
    <div
      className="NPInputWrap"
      style={{ paddingBottom: isMobileSmall ? "10px" : "0px" }}
    >
      <img
        src={userDoc.picture ? userDoc.picture : defaultPic}
        alt=""
        onClick={() => navigate(`/profile/${userDoc.uid}`)}
      />
      <input
        type="text"
        placeholder={
          isMobileSmall
            ? `What's on your mind, ${userDoc.firstName}?`
            : `What's on your mind?`
        }
        onClick={showAddPost}
        style={{ marginLeft: isMobileSmall ? "10px" : "5px" }}
      />
      <NPButtons
        image={PostPhoto}
        text=""
        height={"30px"}
        showAddPost={showAddPost}
      />
    </div>
  );
};
