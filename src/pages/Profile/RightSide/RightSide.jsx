import React from "react";
import styles from "./RightSide.module.css";
import NewPost from "../../../components/NewPost/NewPost";

const RightSide = ({ showAddPost }) => {
  return (
    <div className={styles.RightSideWrap}>
      <NewPost showAddPost={showAddPost} />
    </div>
  );
};

export default RightSide;
