import React from "react";
import "./Profile.css";
import ProfileHead from "./ProfileHead/ProfileHead";
import { NewPost } from "../../components/NewPost/NewPost";

const Profile = () => {
  return (
    <div className="ProfilePage">
      <ProfileHead />
      <NewPost />
    </div>
  );
};

export default Profile;
