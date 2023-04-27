import React from "react";
import { PostButton } from "../PostButton/PostButton";
import styles from "./Interactions.module.css";
import CommentIco from "../../../assets/images/Comment.png";
import LikeIco from "../../../assets/images/Like.png";
import LikedIcon from "../../../assets/images/liked.png";
import ShareIco from "../../../assets/images/Share.png";
import { useGlobalState } from "../../../context/GlobalProvider";

const PostInteractionsButtons = ({ liked, btnClicked, style }) => {
  const { isMobileSmall } = useGlobalState();
  return (
    <div className={styles.InteractionsButtons} style={style}>
      <div className={styles.PostButtonWrap}>
        {liked && (
          <PostButton
            icon={LikedIcon}
            text="Like"
            liked={true}
            btnClicked={btnClicked}
          />
        )}
        {!liked && (
          <PostButton icon={LikeIco} text="Like" btnClicked={btnClicked} />
        )}
      </div>
      <div className={styles.PostButtonWrap}>
        <PostButton
          icon={CommentIco}
          text={isMobileSmall ? "Comment" : ""}
          btnClicked={btnClicked}
        />
      </div>
      <div className={styles.PostButtonWrap}>
        <PostButton
          icon={ShareIco}
          text={isMobileSmall ? "Share" : ""}
          btnClicked={btnClicked}
        />
      </div>
    </div>
  );
};

export default PostInteractionsButtons;
