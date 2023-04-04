import React, { useState } from "react";
import AddPost from "../../components/Post/Modals/AddPost";
import ProfileLeftSide from "./LeftSide/ProfileLeftSide";
import styles from "./Profile.module.css";
import ProfileHead from "./ProfileHead/ProfileHead";
import ProfileRightSide from "./RightSide/ProfileRightSide";
import { useMediaQuery } from "react-responsive";

const ProfileBodyWrap = ({ children, isDesktop }) => {
  return (
    <div
      className="w-100"
      style={{
        backgroundColor: "var(--color-darkest)",
        zIndex: "999",
        transform: `${isDesktop ? "translate(0, 0)" : "translate(0, -80px)"}`,
      }}
    >
      <div className={styles.ProfileBodyWrap} style={{}}>
        {children}
      </div>
    </div>
  );
};

const Profile = () => {
  const [addPostV, setAddPostV] = useState(false);
  const showAddPost = () => setAddPostV(true);
  const hideAddPost = () => setAddPostV(false);
  const isDesktop = useMediaQuery({ query: "(min-width: 950px)" });

  return (
    <>
      <div className={styles.ProfilePage}>
        <ProfileHead />
        <ProfileBodyWrap isDesktop={isDesktop}>
          <ProfileLeftSide />
          <ProfileRightSide showAddPost={showAddPost} />
        </ProfileBodyWrap>
      </div>
      <AddPost addPostV={addPostV} hideAddPost={hideAddPost} />
    </>
  );
};

export default Profile;
