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
import { useGlobalState } from "../../context/GlobalProvider";
import EditPost from "./Modals/EditPost";

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
      style={{ width: "var(--MiddleContainer-witdh)", height: "70px" }}
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
const Post = ({ post, PostTime, width }) => {
  const [userName, setUserName] = useState(null);
  const [hidden, setHidden] = useState(false);
  const [toConfHide, setToConfHide] = useState(false);
  const [DeletePostV, setDeletePostV] = useState(false);
  const [SavePostV, setSavePostV] = useState(false);
  const [savedPost, setSavedPost] = useState(false);
  const { ShowAlert, SetAlertText, user } = useGlobalState();
  const [editPostV, setEditPostV] = useState(false);

  const uid = user.uid;

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
    await deleteHiddenPost(uid, post.id);
    setHidden(false);
    setToConfHide(false);
  };

  const hidePost = async () => {
    await addHiddenPost(uid, post.id);
    setHidden(true);
    setToConfHide(true);
  };

  const onSavePost = async () => {
    try {
      await savePost(uid, post);
      setSavedPost(true);
      SetAlertText(`Saved to Favoris`);
      ShowAlert();
    } catch (error) {}
  };

  const unSavePostHandler = async () => {
    try {
      await unSavePost(uid, post.id);
      setSavedPost(false);
      SetAlertText("Unsaved Post");
      ShowAlert();
    } catch (error) {}
  };

  const hideEditPost = () => {
    setEditPostV(false);
  };

  const showEditPost = () => {
    setEditPostV(true);
  };

  useEffect(() => {
    const check = async () => {
      const isHidden = await checkHiddenPost(uid, post.id);
      if (isHidden) setHidden(true);
    };
    check();
  }, [uid, post.id]);

  useEffect(() => {
    const isSavedPost = async () => {
      const isSaved = await checkSavedPost(uid, post.id);
      if (isSaved) setSavedPost(true);
    };
    isSavedPost();
  }, [uid, post]);

  //* Post is recently hidden
  if (toConfHide) return <PostHidden UndoPostHidden={UndoPostHidden} />;

  //* Post was hidden
  if (hidden) return null;

  //* Post wasn't hide
  return (
    <>
      <div className="Post" style={{ width: width }}>
        <PostHeader
          uid={post.uid}
          postId={post.id}
          UserName={userName}
          PostTime={PostTime}
          hidePost={hidePost}
          showDeletePost={showDeletePost}
          showSavePost={showSavePost}
          showEditPost={showEditPost}
          unSavePost={unSavePostHandler}
          savedPost={savedPost}
        />
        <PostBody Text={post.text} />
        <PostImage image={post.photo} />
        <InteractionStat NbrComments={post.NbrComments} />
        <PostFooter postId={post.id} uid={uid} />
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
      <EditPost editPostV={editPostV} hideEditPost={hideEditPost} post={post} />
    </>
  );
};

export default Post;
