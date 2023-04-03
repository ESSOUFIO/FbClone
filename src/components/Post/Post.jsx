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
import DetailsPost from "./Modals/DetailsPost";

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
const Post = ({ post, PostTime, style }) => {
  const [userName, setUserName] = useState(null);
  const [hidden, setHidden] = useState(false);
  const [toConfHide, setToConfHide] = useState(false);
  const [DeletePostV, setDeletePostV] = useState(false);
  const [SavePostV, setSavePostV] = useState(false);
  const [detailsPostV, setDetailsPostV] = useState(false);
  const [savedPost, setSavedPost] = useState(false);
  const { ShowAlert, SetAlertText, user, userDoc } = useGlobalState();
  const [editPostV, setEditPostV] = useState(false);

  const uid = user.uid;

  const hideDeletePost = () => setDeletePostV(false);
  const showDeletePost = () => setDeletePostV(true);

  const hideDetailsPost = () => setDetailsPostV(false);
  const showDetailsPost = () => setDetailsPostV(true);

  const hideSavePost = () => setSavePostV(false);
  const showSavePost = () => setSavePostV(true);

  const hideEditPost = () => setEditPostV(false);
  const showEditPost = () => setEditPostV(true);

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
      <div className="Post" style={style}>
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
        <PostImage image={post.photo} showDetailsPost={showDetailsPost} />
        <PostFooter
          postId={post.id}
          uid={uid}
          picture={userDoc.picture}
          showDetailsPost={showDetailsPost}
        />
      </div>
      {DeletePostV && (
        <DeletePost
          DeletePostV={DeletePostV}
          hideDeletePost={hideDeletePost}
          postId={post.id}
        />
      )}

      {SavePostV && (
        <SavePost
          SavePostV={SavePostV}
          hideSavePost={hideSavePost}
          onSavePost={onSavePost}
        />
      )}

      {editPostV && (
        <EditPost
          editPostV={editPostV}
          hideEditPost={hideEditPost}
          post={post}
        />
      )}

      {detailsPostV && (
        <DetailsPost
          detailsPostV={detailsPostV}
          hideDetailsPost={hideDetailsPost}
          userName={userName}
          post={post}
          PostTime={PostTime}
          uid={uid}
          picture={userDoc.picture}
        />
      )}
    </>
  );
};

export default Post;
