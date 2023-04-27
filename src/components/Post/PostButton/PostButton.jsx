import { useGlobalState } from "../../../context/GlobalProvider";
import styles from "./PostButton.module.css";

export const PostButton = ({ icon, text, liked = false, btnClicked }) => {
  const { isMobileSmall } = useGlobalState();
  return (
    <div className={styles.PostButton} onClick={() => btnClicked(text)}>
      <img
        src={icon}
        alt=""
        style={{ filter: !liked ? "invert(70%)" : "none" }}
      />
      <span
        style={{
          color: liked ? "var(--color-primary)" : "var(--color-light)",
        }}
      >
        {isMobileSmall ? text : ""}
      </span>
    </div>
  );
};
