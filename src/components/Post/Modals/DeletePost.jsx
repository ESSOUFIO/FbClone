import React from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import { deletePost } from "../../../firebase/post";
import "./PostModals.css";

const Header = ({ hideDeletePost }) => {
  return (
    <>
      <header className="d-flex my-2 py-1" id="custom-styling">
        <h5 className="text-center w-100">Move to your trash?</h5>
        <div className="closeBtn" onClick={hideDeletePost}>
          <MdOutlineClose />
        </div>
      </header>
      <hr style={{ borderTop: "1px solid gray", margin: "0" }} />
    </>
  );
};

const DeletePost = ({ DeletePostV, hideDeletePost, postId }) => {
  const deletePostHandler = async () => {
    await deletePost(postId);
    hideDeletePost();
  };
  return (
    <Modal
      className="DeletePost modal-90w"
      show={DeletePostV}
      onHide={hideDeletePost}
      centered
    >
      <Card>
        <Header hideDeletePost={hideDeletePost} />
        <div>
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
      </Card>
    </Modal>
  );
};

export default DeletePost;
