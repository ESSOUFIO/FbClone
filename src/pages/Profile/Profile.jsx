import React, { useState } from "react";
import AddPost from "../../components/Post/Modals/AddPost";
import ProfileLeftSide from "./LeftSide/ProfileLeftSide";
import styles from "./Profile.module.css";
import ProfileHead from "./ProfileHead/ProfileHead";
import ProfileRightSide from "./RightSide/ProfileRightSide";

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
          <ProfileLeftSide />
          <ProfileRightSide showAddPost={showAddPost} />
        </ProfileBodyWrap>
      </div>
      <AddPost addPostV={addPostV} hideAddPost={hideAddPost} />
    </>
  );
};

export default Profile;
