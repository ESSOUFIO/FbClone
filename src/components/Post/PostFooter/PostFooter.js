import "./PostFooter.css";
import { PostButton } from "../PostButton/PostButton";
import CommentIco from "../../../assets/images/Comment.png";
import LikeIco from "../../../assets/images/Like.png";
import ShareIco from "../../../assets/images/Share.png";

export const PostFooter = () => {
  return (
    <div className="PostFooterWrap">
      <div className="PostFooter">
        <PostButton icon={LikeIco} text="Like" />
        <PostButton icon={CommentIco} text="Comment" />
        <PostButton icon={ShareIco} text="Share" />
      </div>
    </div>
  );
};
