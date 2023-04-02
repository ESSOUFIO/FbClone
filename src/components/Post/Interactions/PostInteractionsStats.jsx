import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styles from "./Interactions.module.css";
import { db } from "../../../firebase/config";
import likeCommentIcon from "../../../assets/images/like-comment.png";

const PostInteractionsStats = ({ postId, style }) => {
  const [nbrLikes, setNbrLikes] = useState(0);
  const [nbrComments, setNbrComments] = useState(0);

  /** listen stats Likes */
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "posts", postId, "interactions", "Like", "likes"),
      (snap) => {
        setNbrLikes(snap.docs.length);
      }
    );
    return unsub;
  }, [postId]);

  /** listen stats Comments */
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "posts", postId, "interactions", "Comment", "comments"),
      (snap) => {
        setNbrComments(snap.docs.length);
      }
    );
    return unsub;
  }, [postId]);

  return (
    <div className={styles.interactionsWrap} style={style}>
      <div style={{ width: "50px" }}>
        {nbrLikes > 0 ? (
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center">
              <img src={likeCommentIcon} alt="" />
            </div>
            <div className="ps-2">{nbrLikes}</div>
          </div>
        ) : null}
      </div>
      {nbrComments > 0 ? (
        <div>
          {nbrComments} <span>comments</span>
        </div>
      ) : null}
    </div>
  );
};

export default PostInteractionsStats;
