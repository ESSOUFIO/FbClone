import "./Post.css";
import { useEffect, useState } from "react";
import { getUser } from "../../firebase/user";
import { PostFooter } from "./PostFooter/PostFooter";
import { PostHeader } from "./PostHeader/PostHeader";
import { addHiddenPost, checkHiddenPost } from "../../firebase/post";

function PostClicked() {
  // console.log("PostClicked :");
}

const PostImage = ({ image }) => {
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
const Post = ({ post, PostTime }) => {
  const [userName, setUserName] = useState(null);
  const [hidden, setHidden] = useState(false);
  const [toConfHide, setToConfHide] = useState(false);

  getUser(post.uid).then((user) =>
    setUserName(user.firstName + " " + user.lastName)
  );

  const hidePost = async () => {
    await addHiddenPost(post.uid, post.id);
    setHidden(true);
    setToConfHide(true);
  };

  useEffect(() => {
    const check = async () => {
      const isHidden = await checkHiddenPost(post.uid, post.id);
      if (isHidden) setHidden(true);
    };
    check();
  }, [post]);

  if (toConfHide)
    return (
      <div className="Post">
        <PostHeader
          uid={post.uid}
          UserName={userName}
          PostTime={PostTime}
          hidePost={hidePost}
        />
        <PostBody Text={post.text} />
        <InteractionStat NbrComments={post.NbrComments} />
        <PostFooter />
      </div>
    );

  if (hidden) return null;
  return (
    <div className="Post">
      <PostHeader
        uid={post.uid}
        UserName={userName}
        PostTime={PostTime}
        hidePost={hidePost}
      />
      <PostBody Text={post.text} />
      {!hidden && !toConfHide && <PostImage image={post.photo} />}
      <InteractionStat NbrComments={post.NbrComments} />
      <PostFooter />
    </div>
  );
};

export default Post;
