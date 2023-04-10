import React, { useCallback, useEffect, useState } from "react";
import styles from "./Comment.module.css";
import styles2 from "./AddComment.module.css";
import { MdMoreHoriz } from "react-icons/md";
import { getUser } from "../../../firebase/user";
import likeCommentIcon from "../../../assets/images/like-comment.png";
import { useGlobalState } from "../../../context/GlobalProvider";
import DeleteComment from "../Modals/DeleteComment";
import { HiOutlineGif } from "react-icons/hi2";
import { IoSendOutline, IoSend } from "react-icons/io5";
import { BsCamera, BsEmojiSmile } from "react-icons/bs";
import {
  disLikeComment,
  likeComment,
  updateComment,
} from "../../../firebase/interaction";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";

const Comment = ({ comment, postTime, postId }) => {
  const [cmtOwner, setCmtOwner] = useState(null);
  const { user } = useGlobalState();
  const [myComment, setMyComment] = useState(false);
  const [deleteCommentV, setDeleteCommentV] = useState(false);
  const [edit, setEdit] = useState(false);
  const [commentEdit, setCommentEdit] = useState("");
  const [liked, setLiked] = useState(false);
  const [nbrLike, setNbrLikes] = useState(0);

  /** listen Like */
  useEffect(() => {
    const unsub = onSnapshot(
      doc(
        db,
        "posts",
        postId,
        "interactions",
        "Comment",
        "comments",
        comment.id,
        "Like",
        user.uid
      ),
      (doc) => {
        doc.data() ? setLiked(true) : setLiked(false);
      }
    );
    return unsub;
  }, [postId, user, comment]);

  /** listen stats Likes */
  useEffect(() => {
    const unsub = onSnapshot(
      collection(
        db,
        "posts",
        postId,
        "interactions",
        "Comment",
        "comments",
        comment.id,
        "Like"
      ),
      (snap) => {
        setNbrLikes(snap.docs.length);
      }
    );
    return unsub;
  }, [postId, comment]);

  const hideCommentPost = () => setDeleteCommentV(false);
  const showCommentPost = () => setDeleteCommentV(true);

  const likeCommentHandler = async () => {
    try {
      if (!liked) {
        await likeComment(postId, user.uid, comment.id);
      } else await disLikeComment(postId, user.uid, comment.id);
    } catch (error) {}
  };

  const editCommentHandler = useCallback(async () => {
    try {
      await updateComment(postId, comment.id, {
        ...comment,
        text: commentEdit,
      });
      setEdit(false);
    } catch (error) {
      console.log(error);
    }
  }, [comment, postId, commentEdit]);

  /** listen Enter */
  useEffect(() => {
    if (commentEdit !== "") {
      const keyDownHandler = (event) => {
        // console.log("User pressed: ", event.key);
        if (event.key === "Enter") {
          event.preventDefault();
          editCommentHandler();
        }
      };
      document.addEventListener("keydown", keyDownHandler);
      return () => {
        document.removeEventListener("keydown", keyDownHandler);
      };
    }
  }, [commentEdit, editCommentHandler]);

  const editClicked = () => {
    setCommentEdit(comment.text);
    setEdit(true);
  };

  useEffect(() => {
    if (user.uid === comment.uid) {
      setMyComment(true);
    } else setMyComment(false);
  }, [user, comment]);

  useEffect(() => {
    getUser(comment.uid).then((user) => setCmtOwner(user));
  }, [comment]);

  const username = cmtOwner?.firstName + " " + cmtOwner?.lastName;
  return (
    <>
      <div className={styles.Comment}>
        <div
          className={styles.userPicture}
          style={{
            backgroundImage: `url(${cmtOwner?.picture})`,
          }}
        ></div>
        {!edit && (
          <>
            <div>
              <div className={styles.CommentText}>
                <b>{username}</b>
                <div>
                  {comment.text}
                  {nbrLike > 0 ? (
                    <div className={styles.likeCommentIcon}>
                      <img src={likeCommentIcon} alt="" />
                      {nbrLike !== 1 ? (
                        <span className="ps-1">{nbrLike}</span>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className={styles.CommentInteractions}>
                <div
                  className={styles.likeComment}
                  style={{
                    color: liked ? "var(--color-primary-text)" : "",
                  }}
                  onClick={likeCommentHandler}
                >
                  Like
                </div>
                <div>Replay</div>
                <div>{postTime}</div>
              </div>
            </div>
            {myComment && (
              <div>
                <div
                  className={styles.CommentBtn}
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <MdMoreHoriz />
                </div>
                <div
                  className="dropdown-menu"
                  style={{ padding: "5px", background: "var(--color-darker)" }}
                >
                  <div className={styles.dropBtn} onClick={editClicked}>
                    Edit
                  </div>
                  <div className={styles.dropBtn} onClick={showCommentPost}>
                    Delete
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        {edit && (
          <div className="w-100">
            <div className={styles2.InputComment}>
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentEdit}
                onChange={(e) => setCommentEdit(e.target.value)}
              />
              <div className={styles2.commentButtons}>
                {!commentEdit && (
                  <div>
                    <IoSendOutline />
                  </div>
                )}
                {commentEdit && (
                  <div className={styles2.sendBtn} onClick={editCommentHandler}>
                    <IoSend />
                  </div>
                )}
                <div>
                  <BsCamera />
                </div>
                <div style={{ fontSize: "15px" }}>
                  <BsEmojiSmile />
                </div>
                <div>
                  <HiOutlineGif />
                </div>
              </div>
            </div>
            <div className={styles.cancelBtn} onClick={() => setEdit(false)}>
              Cancel
            </div>
          </div>
        )}
      </div>
      {deleteCommentV && (
        <DeleteComment
          DeleteCommentV={deleteCommentV}
          hideCommentPost={hideCommentPost}
          postId={postId}
          commentId={comment.id}
        />
      )}
    </>
  );
};

export default Comment;
