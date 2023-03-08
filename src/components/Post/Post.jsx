import { useState } from "react";
import { getUser } from "../../firebase/user";
import "./Post.css";
import { PostFooter } from "./PostFooter/PostFooter";
import { PostHeader } from "./PostHeader/PostHeader";

function PostClicked() {
  // console.log("PostClicked :");
}

const PostImage = ({ image, id }) => {
  return (
    <div className="PostImage" onClick={PostClicked}>
      <img src={image} alt="" width={"100%"} />
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
const Post = ({ uid, PostTime, Text, NbrComments, photo }) => {
  const [userName, setUserName] = useState(null);
  getUser(uid).then((user) =>
    setUserName(user.firstName + " " + user.lastName)
  );

  return (
    <div className="Post">
      <PostHeader
        uid={uid}
        UserName={userName}
        PostTime={PostTime}
        UserPic={""}
      />
      <PostBody Text={Text} />
      <PostImage image={photo} id={uid} />
      <InteractionStat NbrComments={NbrComments} />
      <PostFooter />
    </div>
  );
};

export default Post;
