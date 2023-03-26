import "./PostFooter.css";
import { PostButton } from "../PostButton/PostButton";
import CommentIco from "../../../assets/images/Comment.png";
import LikeIco from "../../../assets/images/Like.png";
import LikedIcon from "../../../assets/images/liked.png";
import ShareIco from "../../../assets/images/Share.png";
import { disLikePost, isLiked, likePost } from "../../../firebase/interaction";
import { useState } from "react";
import { useEffect } from "react";

export const PostFooter = ({ postId, uid }) => {
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
  console.log("liked: ", liked);
  return (
    <div className="PostFooterWrap">
      <div className="PostFooter">
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
        <PostButton icon={CommentIco} text="Comment" btnClicked={btnClicked} />
        <PostButton icon={ShareIco} text="Share" btnClicked={btnClicked} />
      </div>
    </div>
  );
};
