import "./NPInputWrap.css";
import { useGlobalState } from "../../../context/GlobalProvider";
import { useNavigate } from "react-router-dom";
import defaultPic from "../../../assets/images/defProfile.jpg";

export const NPInputWrap = ({ showAddPost, uid }) => {
  const { userDoc } = useGlobalState();
  const navigate = useNavigate();
  return (
    <div className="NPInputWrap">
      <img
        src={userDoc.picture ? userDoc.picture : defaultPic}
        alt=""
        onClick={() => navigate(`/profile/${uid}`)}
      />
      <input
        type="text"
        placeholder="What's on your mind, Omar?"
        onClick={showAddPost}
      />
    </div>
  );
};
