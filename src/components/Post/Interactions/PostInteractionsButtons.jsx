import React from "react";
import { PostButton } from "../PostButton/PostButton";
import styles from "./Interactions.module.css";
import CommentIco from "../../../assets/images/Comment.png";
import LikeIco from "../../../assets/images/Like.png";
import LikedIcon from "../../../assets/images/liked.png";
import ShareIco from "../../../assets/images/Share.png";

const PostInteractionsButtons = ({ liked, btnClicked }) => {
  return (
    <div className={styles.InteractionsButtons}>
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
        <PostButton icon={CommentIco} text="Comment" btnClicked={btnClicked} />
      </div>
      <div className={styles.PostButtonWrap}>
        <PostButton icon={ShareIco} text="Share" btnClicked={btnClicked} />
      </div>
    </div>
  );
};

export default PostInteractionsButtons;
