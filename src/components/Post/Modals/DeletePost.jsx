import React from "react";
import { Button } from "react-bootstrap";
import { deletePost } from "../../../firebase/post";
import MyModal from "../../MyModal/MyModal";
import "./PostModals.css";

const DeletePost = ({ DeletePostV, hideDeletePost, postId }) => {
  const deletePostHandler = async () => {
    await deletePost(postId);
    hideDeletePost();
  };
  return (
    <MyModal
      showModal={DeletePostV}
      hideFunc={hideDeletePost}
      Title={"Move to your trash?"}
    >
      <div className="DeletePost">
        <p className="p-2">
          Items in your trash will be automatically deleted after 30 days. You
          can delete them from your trash earlier by going to activity log in
          settings.
        </p>
        <div className="text-end mb-2 me-2">
          <Button
            variant="light"
            className="m-2 cancelBtn"
            onClick={hideDeletePost}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="m-2"
            style={{
              fontWeight: "600",
              paddingRight: "35px",
              paddingLeft: "35px",
            }}
            onClick={deletePostHandler}
          >
            Move
          </Button>
        </div>
      </div>
    </MyModal>
  );
};

export default DeletePost;
