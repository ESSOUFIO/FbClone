import React from "react";
import LeftSide from "./LeftSide/LeftSide";
import styles from "./Profile.module.css";
import ProfileHead from "./ProfileHead/ProfileHead";
import RightSide from "./RightSide/RightSide";

const ProfileBodyWrap = ({ children }) => {
  return <div className={styles.ProfileBodyWrap}>{children}</div>;
};

const Profile = () => {
  return (
    <div className={styles.ProfilePage}>
      <ProfileHead />
      <ProfileBodyWrap>
        <LeftSide />
        <RightSide />
      </ProfileBodyWrap>
    </div>
  );
};

export default Profile;
