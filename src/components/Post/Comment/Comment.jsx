import React from "react";
import styles from "./Comment.module.css";
import { MdOutlineMoreHoriz } from "react-icons/md";

const Comment = ({ userName, userPicture, text, postTime }) => {
  return (
    <div className={styles.Comment}>
      <div
        className={styles.userPicture}
        style={{
          backgroundImage: `url(${userPicture})`,
        }}
      ></div>
      <div>
        <div className={styles.CommentText}>
          <b>{userName}</b>
          <div> {text}</div>
        </div>
        <div className={styles.CommentInteractions}>
          <div>Like</div>
          <div>Replay</div>
          <div>{postTime}</div>
        </div>
      </div>
      <div>
        <div className={styles.CommentBtn}>
          <MdOutlineMoreHoriz />
        </div>
      </div>
    </div>
  );
};

export default Comment;
