import { useCallback, useEffect, useState } from "react";
import {
  addComment,
  disLikePost,
  isLiked,
  likePost,
} from "../../../firebase/interaction";
import MyModal from "../../MyModal/MyModal";
import AddComment from "../Comment/AddComment";
import PostInteractionsButtons from "../Interactions/PostInteractionsButtons";
import PostInteractionsStats from "../Interactions/PostInteractionsStats";
import { PostHeader } from "../PostHeader/PostHeader";

const PostImage = ({ image, showDetailsPost }) => {
  return (
    <div className="PostImage" onClick={showDetailsPost}>
      <img src={image} alt="" width={"100%"} />
    </div>
  );
};

const PostBody = ({ Text }) => {
  return <div className="PostBody">{Text}</div>;
};

const DetailsPost = ({
  detailsPostV,
  hideDetailsPost,
  userName,
  post,
  PostTime,
  uid,
  picture,
}) => {
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);
  const postId = post.id;

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
          //*
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

  const addCommentHandler = useCallback(async () => {
    try {
      await addComment(postId, uid, comment);
      // getLastComment(postId).then((doc) => setLastComment(doc));
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
    <MyModal
      showModal={detailsPostV}
      hideFunc={hideDetailsPost}
      Title={`${userName}'s post`}
      Large={true}
    >
      <div className="Post" style={{ maxHeight: "550px", overflow: "auto" }}>
        <PostHeader
          uid={post.uid}
          postId={post.id}
          UserName={userName}
          PostTime={PostTime}
        />
        <PostBody Text={post.text} />
        <PostImage image={post.photo} />
        <PostInteractionsStats />
        <PostInteractionsButtons liked={liked} btnClicked={btnClicked} />
        <AddComment
          picture={picture}
          comment={comment}
          setComment={setComment}
          addCommentHandler={addCommentHandler}
          isFixed={true}
        />
      </div>
    </MyModal>
  );
};

export default DetailsPost;
