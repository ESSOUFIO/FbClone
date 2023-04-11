import React, { useCallback, useEffect, useState } from "react";
import styles from "./AddComment.module.css";
import { HiOutlineGif } from "react-icons/hi2";
import { IoSendOutline, IoSend } from "react-icons/io5";
import { BsCamera, BsEmojiSmile } from "react-icons/bs";
import { addComment } from "../../../firebase/interaction";
import { useGlobalState } from "../../../context/GlobalProvider";

const AddComment = ({ postId, uid, picture, isFixed }) => {
  const [comment, setComment] = useState("");
  const { isMobileSmall } = useGlobalState();

  const addCommentHandler = useCallback(async () => {
    document.body.style.cursor = "default";
    try {
      await addComment(postId, uid, comment);
      setComment("");
    } catch (error) {
      console.log(error);
    }
  }, [comment, postId, uid]);

  useEffect(() => {
    if (comment !== "") {
      const keyDownHandler = (event) => {
        // console.log("User pressed: ", event.key);
        if (event.key === "Enter") {
          event.preventDefault();
          addCommentHandler();
        }
      };
      document.addEventListener("keydown", keyDownHandler);
      return () => {
        document.removeEventListener("keydown", keyDownHandler);
      };
    }
  }, [comment, addCommentHandler]);
  return (
    <div
      className={styles.newComment}
      style={{
        position: isFixed ? "fixed" : "absolute",
        width: isFixed ? "97%" : "100%",
      }}
    >
      <div
        className={styles.userPicture}
        style={{
          backgroundImage: `url(${picture})`,
        }}
      ></div>
      <div className={styles.InputComment}>
        <input
          type="text"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className={styles.commentButtons}>
          {!comment && (
            <div>
              <IoSendOutline />
            </div>
          )}
          {comment && (
            <div className={styles.sendBtn} onClick={addCommentHandler}>
              <IoSend />
            </div>
          )}
          {isMobileSmall && (
            <>
              <div>
                <BsCamera />
              </div>
              <div style={{ fontSize: "15px" }}>
                <BsEmojiSmile />
              </div>
              <div>
                <HiOutlineGif />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddComment;
