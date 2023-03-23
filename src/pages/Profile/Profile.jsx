import React, { useState } from "react";
import AddPost from "../../components/Post/Modals/AddPost";
import LeftSide from "./LeftSide/LeftSide";
import styles from "./Profile.module.css";
import ProfileHead from "./ProfileHead/ProfileHead";
import RightSide from "./RightSide/RightSide";

const ProfileBodyWrap = ({ children }) => {
  return <div className={styles.ProfileBodyWrap}>{children}</div>;
};

const Profile = () => {
  const [addPostV, setAddPostV] = useState(false);
  const showAddPost = () => setAddPostV(true);
  const hideAddPost = () => setAddPostV(false);

  return (
    <>
      <div className={styles.ProfilePage}>
        <ProfileHead />
        <ProfileBodyWrap>
          <LeftSide />
          <RightSide showAddPost={showAddPost} />
        </ProfileBodyWrap>
      </div>
      <AddPost addPostV={addPostV} hideAddPost={hideAddPost} />
    </>
  );
};

export default Profile;
