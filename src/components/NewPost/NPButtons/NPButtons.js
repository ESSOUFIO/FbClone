import { useGlobalState } from "../../../context/GlobalProvider";
import "./NPButtons.css";

export const NPButtons = ({ image, text, height, showAddPost }) => {
  const { isMobileSmall } = useGlobalState();
  return (
    <div
      className="NPButtons"
      onClick={showAddPost}
      style={{ padding: isMobileSmall ? "7px 10px" : "0" }}
    >
      <img src={image} alt="" height={height} />
      <span style={{ marginLight: "10px" }}>{text}</span>
    </div>
  );
};
