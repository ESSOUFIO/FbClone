import React, { useEffect, useState } from "react";
import AddPost from "../../components/Post/Modals/AddPost";
import ProfileLeftSide from "./LeftSide/ProfileLeftSide";
import styles from "./Profile.module.css";
import ProfileHead from "./ProfileHead/ProfileHead";
import ProfileRightSide from "./RightSide/ProfileRightSide";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import { getUser } from "../../firebase/user";
import { useGlobalState } from "../../context/GlobalProvider";

const ProfileBodyWrap = ({ children, isDesktop, isDesktopMedium }) => {
  return (
    <div
      className="w-100"
      style={{
        backgroundColor: "var(--color-darkest)",
        zIndex: "9",
        transform: `${isDesktop ? "translate(0, 0)" : "translate(0, -80px)"}`,
      }}
    >
      <div
        className={styles.ProfileBodyWrap}
        style={{
          flexDirection: `${isDesktopMedium ? "row" : "column"}`,
          width: `${isDesktopMedium ? "900px" : "100%"}`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

const Profile = () => {
  const [addPostV, setAddPostV] = useState(false);
  const showAddPost = () => setAddPostV(true);
  const hideAddPost = () => setAddPostV(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isMyProfile, setIsMyProfile] = useState(false);

  let { userId } = useParams();
  const { user, userDoc } = useGlobalState();

  useEffect(() => {
    const getUserFunc = async () => {
      try {
        const data = await getUser(userId);
        setUserProfile(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (userId === user.uid) {
      setIsMyProfile(true);
      setUserProfile(userDoc);
    } else {
      setIsMyProfile(false);
      getUserFunc();
    }
    // return () => window.scrollTo(0, 0);
  }, [userId, user, userDoc]);

  const isDesktop = useMediaQuery({
    query: "(min-width: 950px)",
  });

  const isDesktopMedium = useMediaQuery({
    query: "(min-width: 900px)",
  });

  const isLaptopLarge = useMediaQuery({
    query: "(min-width: 850px)",
  });

  const isLaptopMedium = useMediaQuery({
    query: "(min-width: 750px)",
  });

  const isMobile = useMediaQuery({
    query: "(min-width: 600px)",
  });

  return (
    <>
      <div className={styles.ProfilePage}>
        <ProfileHead
          userDoc={userProfile}
          isDesktop={isDesktop}
          isLaptopLarge={isLaptopLarge}
          isLaptopMedium={isLaptopMedium}
          isMobile={isMobile}
          isMyProfile={isMyProfile}
        />
        <ProfileBodyWrap
          isDesktop={isDesktop}
          isDesktopMedium={isDesktopMedium}
        >
          <ProfileLeftSide
            isDesktopMedium={isDesktopMedium}
            isMobile={isMobile}
            isMyProfile={isMyProfile}
          />
          <ProfileRightSide
            uid={userId}
            showAddPost={showAddPost}
            isDesktopMedium={isDesktopMedium}
            isMobile={isMobile}
            isMyProfile={isMyProfile}
          />
        </ProfileBodyWrap>
      </div>
      <AddPost addPostV={addPostV} hideAddPost={hideAddPost} />
    </>
  );
};

export default Profile;
