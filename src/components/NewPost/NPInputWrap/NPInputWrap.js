import "./NPInputWrap.css";
import { useNavigate } from "react-router-dom";
import defaultPic from "../../../assets/images/defProfile.jpg";

export const NPInputWrap = ({ showAddPost, userDoc }) => {
  const navigate = useNavigate();
  return (
    <div className="NPInputWrap">
      <img
        src={userDoc.picture ? userDoc.picture : defaultPic}
        alt=""
        onClick={() => navigate(`/profile/${userDoc.uid}`)}
      />
      <input
        type="text"
        placeholder={`What's on your mind, ${userDoc.firstName}?`}
        onClick={showAddPost}
      />
    </div>
  );
};
