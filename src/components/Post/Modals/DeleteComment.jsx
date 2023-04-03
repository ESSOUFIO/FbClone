import React from "react";
import MyModal from "../../MyModal/MyModal";
import { Button } from "react-bootstrap";
import { deleteComment } from "../../../firebase/interaction";

const DeleteComment = ({
  DeleteCommentV,
  hideCommentPost,
  postId,
  commentId,
}) => {
  const deleteCommentHandler = async () => {
    await deleteComment(postId, commentId);
    hideCommentPost();
  };
  return (
    <MyModal
      showModal={DeleteCommentV}
      hideFunc={hideCommentPost}
      Title={"Delete Comment?"}
    >
      <div className="DeletePost">
        <p className="p-2">Are you sure you want to delete this comment?</p>
        <div className="text-end mb-2 me-2">
          <Button
            variant="light"
            className="m-2 cancelBtn"
            onClick={hideCommentPost}
          >
            No
          </Button>
          <Button
            variant="primary"
            className="m-2"
            style={{
              fontWeight: "600",
              paddingRight: "35px",
              paddingLeft: "35px",
            }}
            onClick={deleteCommentHandler}
          >
            Delete
          </Button>
        </div>
      </div>
    </MyModal>
  );
};

export default DeleteComment;
