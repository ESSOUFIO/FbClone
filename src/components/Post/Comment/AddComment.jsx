import React from "react";
import styles from "./AddComment.module.css";
import { HiOutlineGif } from "react-icons/hi2";
import { IoSendOutline, IoSend } from "react-icons/io5";
import { BsCamera, BsEmojiSmile } from "react-icons/bs";

const AddComment = ({
  picture,
  comment,
  setComment,
  addCommentHandler,
  isFixed,
}) => {
  return (
    <div
      className={styles.newComment}
      style={{
        position: `${isFixed ? "fixed" : "absolute"}`,
        width: `${isFixed ? "97%" : "100%"}`,
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
    </div>
  );
};

export default AddComment;
