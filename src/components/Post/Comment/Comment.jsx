import React, { useEffect, useState } from "react";
import styles from "./Comment.module.css";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { getUser } from "../../../firebase/user";
import { deleteComment } from "../../../firebase/interaction";

const Comment = ({ comment, postTime, commentId, postId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser(comment.uid).then((user) => setUser(user));
  }, [comment]);

  const deleteCommentHandler = async () => {
    await deleteComment(postId, commentId);
  };
  const username = user?.firstName + " " + user?.lastName;
  return (
    <div className={styles.Comment}>
      <div
        className={styles.userPicture}
        style={{
          backgroundImage: `url(${user?.picture})`,
        }}
      ></div>
      <div>
        <div className={styles.CommentText}>
          <b>{username}</b>
          <div> {comment.text}</div>
        </div>
        <div className={styles.CommentInteractions}>
          <div>Like</div>
          <div>Replay</div>
          <div>{postTime}</div>
        </div>
      </div>
      <div>
        <div className={styles.CommentBtn} onClick={deleteCommentHandler}>
          <MdOutlineMoreHoriz />
        </div>
      </div>
    </div>
  );
};

export default Comment;
