import { useCallback, useEffect, useState } from "react";
import {
  addComment,
  disLikePost,
  likePost,
} from "../../../firebase/interaction";
import MyModal from "../../MyModal/MyModal";
import AddComment from "../Comment/AddComment";
import PostInteractionsButtons from "../Interactions/PostInteractionsButtons";
import PostInteractionsStats from "../Interactions/PostInteractionsStats";
import { PostHeader } from "../PostHeader/PostHeader";
import Comment from "../Comment/Comment";
import { calcTime } from "../../../utils/calcTime";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../../firebase/config";

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
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const postId = post.id;

  const addCommentHandler = useCallback(async () => {
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

  useEffect(() => {
    const q = query(
      collection(db, "posts", postId, "interactions", "Comment", "comments"),
      orderBy("time", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      const cmts = [];
      snap.forEach((doc) => {
        cmts.push({ id: doc.id, ...doc.data() });
      });
      setComments(cmts);
    });
    return () => unsub();
  }, [postId]);

  /** listen Like */
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "posts", postId, "interactions", "Like", "likes", uid),
      (doc) => {
        doc.data() ? setLiked(true) : setLiked(false);
      }
    );
    return unsub;
  }, [postId, uid]);

  /** Interactions handler */
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
          break;
        case "Share":
          // code block
          break;
        default:
        // code block
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        <PostInteractionsStats
          postId={postId}
          style={{ margin: "10px 20px" }}
        />
        <PostInteractionsButtons liked={liked} btnClicked={btnClicked} />
        {comments &&
          comments.map((cmt) => {
            const time = calcTime(cmt.time);
            return (
              <Comment
                key={cmt.id}
                comment={cmt}
                postTime={time}
                postId={postId}
              />
            );
          })}
        <AddComment
          picture={picture}
          comment={comment}
          postId={postId}
          uid={uid}
          isFixed={true}
        />
      </div>
    </MyModal>
  );
};

export default DetailsPost;
