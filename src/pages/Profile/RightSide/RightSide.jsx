import React from "react";
import styles from "./RightSide.module.css";
import NewPost from "../../../components/NewPost/NewPost";

const RightSide = () => {
  return (
    <div className={styles.RightSideWrap}>
      <NewPost />
    </div>
  );
};

export default RightSide;
