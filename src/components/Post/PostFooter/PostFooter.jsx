import styles from "./PostFooter.module.css";

import {
  addComment,
  disLikePost,
  getLastComment,
  isLiked,
  likePost,
} from "../../../firebase/interaction";
import { useCallback, useState } from "react";
import { useEffect } from "react";

import { getUser } from "../../../firebase/user";
import { calcTime } from "../../../utils/calcTime";
import Comment from "../Comment/Comment";
import AddComment from "../Comment/AddComment";
import PostInteractionsButtons from "../Interactions/PostInteractionsButtons";
import PostInteractionsStats from "../Interactions/PostInteractionsStats";

export const OtherComments = ({ lastComment, showDetailsPost }) => {
  const [user, setUser] = useState(null);
  const postTime = calcTime(lastComment?.time);

  useEffect(() => {
    if (lastComment) {
      getUser(lastComment.uid).then((user) => setUser(user));
    }
  }, [lastComment]);

  const username = user?.firstName + " " + user?.lastName;
  return (
    <>
      {lastComment && (
        <div className={styles.OtherComments}>
          <div className={styles.viewMoreComments} onClick={showDetailsPost}>
            View more comments
          </div>
          <Comment
            userName={username}
            userPicture={user?.picture}
            text={lastComment?.text}
            postTime={postTime}
          />
        </div>
      )}
    </>
  );
};

export const CommentsSection = ({ picture, postId, uid, showDetailsPost }) => {
  const [comment, setComment] = useState("");
  const [lastComment, setLastComment] = useState(null);

  useEffect(() => {
    getLastComment(postId).then((doc) => setLastComment(doc));
  }, [postId]);

  const addCommentHandler = useCallback(async () => {
    try {
      await addComment(postId, uid, comment);
      getLastComment(postId).then((doc) => setLastComment(doc));
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
      <OtherComments
        postId={postId}
        picture={picture}
        lastComment={lastComment}
        showDetailsPost={showDetailsPost}
      />
      <AddComment
        picture={picture}
        comment={comment}
        setComment={setComment}
        addCommentHandler={addCommentHandler}
        isFixed={false}
      />
    </div>
  );
};

/** ======== MAIN ======== */
export const PostFooter = ({ postId, uid, picture, showDetailsPost }) => {
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
          showDetailsPost();
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
        <PostInteractionsStats />
        <PostInteractionsButtons liked={liked} btnClicked={btnClicked} />
        <CommentsSection
          picture={picture}
          postId={postId}
          uid={uid}
          showDetailsPost={showDetailsPost}
        />
      </div>
    </div>
  );
};
