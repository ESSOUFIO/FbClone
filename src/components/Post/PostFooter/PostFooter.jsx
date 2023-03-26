import "./PostFooter.css";
import { PostButton } from "../PostButton/PostButton";
import CommentIco from "../../../assets/images/Comment.png";
import LikeIco from "../../../assets/images/Like.png";
import ShareIco from "../../../assets/images/Share.png";
import { likePost } from "../../../firebase/interaction";

export const PostFooter = ({ postId, uid }) => {
  const btnClicked = async (btn) => {
    const d = new Date();
    const likeDoc = { eventTime: d.getTime() };
    try {
      switch (btn) {
        case "Like":
          await likePost(postId, uid, likeDoc);
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="PostFooterWrap">
      <div className="PostFooter">
        <PostButton icon={LikeIco} text="Like" btnClicked={btnClicked} />
        <PostButton icon={CommentIco} text="Comment" btnClicked={btnClicked} />
        <PostButton icon={ShareIco} text="Share" btnClicked={btnClicked} />
      </div>
    </div>
  );
};
