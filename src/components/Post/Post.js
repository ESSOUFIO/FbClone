import "./Post.css";
import { PostFooter } from "./PostFooter/PostFooter";
import { PostHeader } from "./PostHeader/PostHeader";

const PostImage = ({ image }) => {
  return (
    <div
      className="PostImage"
      style={{ backgroundImage: `url(${image})` }}
    ></div>
  );
};

const InteractionStat = ({ NbrComments }) => {
  const NbrCom = NbrComments ? NbrComments + " comments" : null;
  return (
    <div className="InteractionStat">
      <span>{NbrCom}</span>
    </div>
  );
};

export const Post = ({ UserName, PostTime, NbrComments, UserPic, image }) => {
  return (
    <div className="Post">
      <PostHeader UserName={UserName} PostTime={PostTime} UserPic={UserPic} />
      <PostImage image={image} />
      <InteractionStat NbrComments={NbrComments} />
      <PostFooter />
    </div>
  );
};
