import styles from "./PostFooter.module.css";
import { PostButton } from "../PostButton/PostButton";
import CommentIco from "../../../assets/images/Comment.png";
import LikeIco from "../../../assets/images/Like.png";
import LikedIcon from "../../../assets/images/liked.png";
import ShareIco from "../../../assets/images/Share.png";
import {
  addComment,
  disLikePost,
  isLiked,
  likePost,
} from "../../../firebase/interaction";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import { HiOutlineGif } from "react-icons/hi2";
import { IoSendOutline, IoSend } from "react-icons/io5";
import { BsCamera, BsEmojiSmile } from "react-icons/bs";
import { MdOutlineMoreHoriz } from "react-icons/md";

export const InteractionsStats = () => {
  return <></>;
};

export const InteractionsButtons = ({ liked, btnClicked }) => {
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

export const OtherComments = ({ picture }) => {
  return (
    <div className={styles.OtherComments}>
      <div className={styles.viewMoreComments}>View more comments</div>
      <div className={styles.lastComment}>
        <div
          className={styles.userPicture}
          style={{
            backgroundImage: `url(${picture})`,
          }}
        ></div>
        <div>
          <div className={styles.lastCommentText}>
            <b>Omar ESSOUFI</b>
            <div> Test test Omar</div>
          </div>
          <div className={styles.lastCommentInteractions}>
            <div>Like</div>
            <div>Replay</div>
            <div>3h</div>
          </div>
        </div>
        <div>
          <div className={styles.lastCommentBtn}>
            <MdOutlineMoreHoriz />
          </div>
        </div>
      </div>
    </div>
  );
};

export const CommentsSection = ({ picture, postId, uid }) => {
  const [comment, setComment] = useState("");

  const addCommentHandler = useCallback(async () => {
    try {
      await addComment(postId, uid, comment);
      setComment("");
    } catch (error) {}
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
    <div className={styles.CommentsSection}>
      <OtherComments picture={picture} />
      <div className={styles.newComment}>
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
    </div>
  );
};

/** ======== MAIN ======== */
export const PostFooter = ({ postId, uid, picture }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const checkLiked = async () => {
      try {
        const res = await isLiked(postId, uid);
        res ? setLiked(true) : setLiked(false);
      } catch (error) {}
    };
    checkLiked();
  }, [postId, uid]);

  const btnClicked = async (btn) => {
    try {
      switch (btn) {
        case "Like":
          if (!liked) {
            await likePost(postId, uid);
          } else {
            await disLikePost(postId, uid);
          }
          break;
        case "Comment":
          console.log("Comment");
          break;
        case "Share":
          // code block
          break;
        default:
        // code block
      }
      const res = await isLiked(postId, uid);
      res ? setLiked(true) : setLiked(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.PostFooterWrap}>
      <div className={styles.PostFooter}>
        <InteractionsStats />
        <InteractionsButtons liked={liked} btnClicked={btnClicked} />
        <CommentsSection picture={picture} postId={postId} uid={uid} />
      </div>
    </div>
  );
};
