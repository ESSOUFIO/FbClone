import "./Post.css";
import { useEffect, useState } from "react";
import { getUser } from "../../firebase/user";
import { PostFooter } from "./PostFooter/PostFooter";
import { PostHeader } from "./PostHeader/PostHeader";
import {
  addHiddenPost,
  checkHiddenPost,
  checkSavedPost,
  deleteHiddenPost,
  savePost,
  unSavePost,
} from "../../firebase/post";
import { Button } from "react-bootstrap";
import hideIcon from "../../assets/images/hidden.png";
import DeletePost from "./Modals/DeletePost";
import SavePost from "./Modals/SavePost";

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

const PostHidden = ({ UndoPostHidden }) => {
  return (
    <div
      className="Post px-3 d-flex justify-content-between"
      style={{ height: "70px" }}
    >
      <div className="d-flex gap-3" style={{ color: "var(--color-lighter)" }}>
        <div className="">
          <img src={hideIcon} alt="" style={{ filter: "invert(80%)" }} />
        </div>
        <div>
          <h6 style={{ fontWeight: "600" }}>Post hidden</h6>
          <p style={{ fontSize: "13px" }}>You'll see less posts like this.</p>
        </div>
      </div>
      <div className="d-flex align-items-center">
        <Button className="btnUndo" onClick={UndoPostHidden}>
          Undo
        </Button>
      </div>
    </div>
  );
};

/** ========= MAIN ========== */
const Post = ({ post, PostTime }) => {
  const [userName, setUserName] = useState(null);
  const [hidden, setHidden] = useState(false);
  const [toConfHide, setToConfHide] = useState(false);
  const [DeletePostV, setDeletePostV] = useState(false);
  const [SavePostV, setSavePostV] = useState(false);
  const [savedPost, setSavedPost] = useState(false);

  const hideDeletePost = () => {
    setDeletePostV(false);
  };

  const showDeletePost = () => {
    setDeletePostV(true);
  };

  const hideSavePost = () => {
    setSavePostV(false);
  };

  const showSavePost = () => {
    setSavePostV(true);
  };

  getUser(post.uid).then((user) =>
    setUserName(user.firstName + " " + user.lastName)
  );

  const UndoPostHidden = async () => {
    await deleteHiddenPost(post.uid, post.id);
    setHidden(false);
    setToConfHide(false);
  };

  const hidePost = async () => {
    await addHiddenPost(post.uid, post.id);
    setHidden(true);
    setToConfHide(true);
  };

  const onSavePost = async () => {
    try {
      await savePost(post.uid, post.id);
      setSavedPost(true);
    } catch (error) {}
  };

  const unSavePostHandler = async () => {
    try {
      await unSavePost(post.uid, post.id);
      setSavedPost(false);
    } catch (error) {}
  };

  useEffect(() => {
    const check = async () => {
      const isHidden = await checkHiddenPost(post.uid, post.id);
      if (isHidden) setHidden(true);
    };
    check();
  }, [post]);

  useEffect(() => {
    const isSavedPost = async () => {
      const isSaved = await checkSavedPost(post.uid, post.id);
      if (isSaved) setSavedPost(true);
    };
    isSavedPost();
  }, [post]);

  //* Post is recently hidden
  if (toConfHide) return <PostHidden UndoPostHidden={UndoPostHidden} />;

  //* Post was hidden
  if (hidden) return null;

  //* Post wasn't hide
  return (
    <>
      <div className="Post">
        <PostHeader
          uid={post.uid}
          postId={post.id}
          UserName={userName}
          PostTime={PostTime}
          hidePost={hidePost}
          showDeletePost={showDeletePost}
          showSavePost={showSavePost}
          unSavePost={unSavePostHandler}
          savedPost={savedPost}
        />
        <PostBody Text={post.text} />
        <PostImage image={post.photo} />
        <InteractionStat NbrComments={post.NbrComments} />
        <PostFooter />
      </div>
      <DeletePost
        DeletePostV={DeletePostV}
        hideDeletePost={hideDeletePost}
        postId={post.id}
      />
      <SavePost
        SavePostV={SavePostV}
        hideSavePost={hideSavePost}
        onSavePost={onSavePost}
      />
    </>
  );
};

export default Post;
