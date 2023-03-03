import "./Post.css";
import { PostFooter } from "./PostFooter/PostFooter";
import { PostHeader } from "./PostHeader/PostHeader";

function PostClicked() {
  // console.log("PostClicked :");
}

const PostImage = ({ image, id }) => {
  return (
    <div className="PostImage">
      <img src={image} alt="" width={"100%"} />
      <button onClick={PostClicked}>tst</button>
    </div>
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

const PostBody = ({ Text }) => {
  return <div className="PostBody">{Text}</div>;
};

/** ========= MAIN ========== */
export const Post = ({
  id,
  UserName,
  PostTime,
  Text,
  NbrComments,
  UserPic,
  image,
}) => {
  return (
    <div className="Post">
      <PostHeader UserName={UserName} PostTime={PostTime} UserPic={UserPic} />
      <PostBody Text={Text} />
      <PostImage image={image} id={id} />
      <InteractionStat NbrComments={NbrComments} />
      <PostFooter />
    </div>
  );
};
