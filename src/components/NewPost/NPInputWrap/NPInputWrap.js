import "./NPInputWrap.css";
import { useGlobalState } from "../../../context/GlobalProvider";
import { useNavigate } from "react-router-dom";

export const NPInputWrap = ({ showAddPost }) => {
  const { userDoc } = useGlobalState();
  const navigate = useNavigate();
  return (
    <div className="NPInputWrap">
      <img src={userDoc.picture} alt="" onClick={() => navigate("profile")} />
      <input
        type="text"
        placeholder="What's on your mind, Omar?"
        onClick={showAddPost}
      />
    </div>
  );
};
