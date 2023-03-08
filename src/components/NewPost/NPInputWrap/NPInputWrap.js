import "./NPInputWrap.css";
import { useGlobalState } from "../../../context/GlobalProvider";

export const NPInputWrap = ({ showAddPost }) => {
  const { userDoc } = useGlobalState();

  return (
    <div className="NPInputWrap">
      <img src={userDoc.picture} alt="" />
      <input
        type="text"
        placeholder="What's on your mind, Omar?"
        onClick={showAddPost}
      />
    </div>
  );
};
