import React, { useEffect, useState } from "react";
import styles from "./ProfileRightSide.module.css";
import NewPost from "../../../components/NewPost/NewPost";
import Post from "../../../components/Post/Post";
import { calcTime } from "../../../utils/calcTime";
import filterIcon from "../../../assets/images/filter.png";
import gridIcon from "../../../assets/images/grid.png";
import listIcon from "../../../assets/images/list.png";
import gridIconActive from "../../../assets/images/grid-active.png";
import listIconActive from "../../../assets/images/list-active.png";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase/config";

const FilterBtn = ({ icon, title }) => {
  return (
    <div className={styles.FilterBtn}>
      <img src={icon} alt="" style={{ filter: "invert(90%)" }} />
      <span>{title}</span>
    </div>
  );
};

const FilterViewBtn = ({ icon, title, active, setActiveBtn }) => {
  return (
    <>
      {!active && (
        <div
          className={styles.filterViewBtnWrap}
          onClick={() => setActiveBtn(title)}
        >
          <div className={styles.filterViewBtn}>
            <img src={icon} alt="" style={{ filter: "invert(90%)" }} />
            <span>{title}</span>
          </div>
        </div>
      )}

      {active && (
        <div className={`${styles.filterViewBtnWrap} ${styles.activeWrap}`}>
          <div className={`${styles.filterViewBtn} ${styles.active}`}>
            <img src={icon} alt="" />
            <span>{title}</span>
          </div>
        </div>
      )}
    </>
  );
};

const FilterPosts = ({ isDesktopMedium, isMobile }) => {
  const [viewBtn, setViewBtn] = useState([
    {
      title: "List View",
      icon: listIconActive,
      active: true,
    },
    {
      title: "Grid View",
      icon: gridIcon,
      active: false,
    },
  ]);

  const setActiveBtn = (title) => {
    const updateState = [];
    if (title === viewBtn[0].title) {
      updateState.push({
        title: viewBtn[0].title,
        icon: listIconActive,
        active: true,
      });
    } else {
      updateState.push({
        title: viewBtn[0].title,
        icon: listIcon,
        active: false,
      });
    }

    if (title === viewBtn[1].title) {
      updateState.push({
        title: viewBtn[1].title,
        icon: gridIconActive,
        active: true,
      });
    } else {
      updateState.push({
        title: viewBtn[1].title,
        icon: gridIcon,
        active: false,
      });
    }
    setViewBtn(updateState);
  };

  return (
    <div
      className={styles.FilterPosts}
      style={{
        maxWidth: `${isDesktopMedium ? "" : isMobile ? "500px" : "100%"}`,
      }}
    >
      <div className="d-flex justify-content-between px-3 py-2">
        <h5>Posts</h5>
        <div className="d-flex gap-2">
          <FilterBtn title={"Filters"} icon={filterIcon} />
          <FilterBtn title={"Manage Posts"} />
        </div>
      </div>
      <hr
        style={{
          borderTop: "1px solid var(--color-light)",
          margin: "0",
        }}
      />
      <dir className="d-flex justify-content-center px-3 m-0 gap-1">
        <FilterViewBtn
          title={"List View"}
          icon={viewBtn[0].icon}
          active={viewBtn[0].active}
          setActiveBtn={setActiveBtn}
        />
        <FilterViewBtn
          title={"Grid View"}
          icon={viewBtn[1].icon}
          active={viewBtn[1].active}
          setActiveBtn={setActiveBtn}
        />
      </dir>
    </div>
  );
};

const ProfileRightSide = ({
  showAddPost,
  isDesktopMedium,
  isMobile,
  uid,
  isMyProfile,
}) => {
  const [myPosts, setMyPosts] = useState(null);

  /** My Posts */
  useEffect(() => {
    if (uid) {
      const q = query(collection(db, "posts"), orderBy("time", "desc"));
      const unsub = onSnapshot(q, (snap) => {
        const posts = [];
        snap.forEach((doc) => {
          if (doc.data().uid === uid) {
            posts.push({ id: doc.id, ...doc.data() });
          }
        });
        setMyPosts(posts);
      });
      return () => unsub();
    }
  }, [uid]);

  return (
    <div
      className={styles.RightSideWrap}
      style={{
        maxWidth: `${isDesktopMedium ? "" : "100vw"}`,
      }}
    >
      {isMyProfile && (
        <NewPost
          showAddPost={showAddPost}
          style={{
            maxWidth: `${isDesktopMedium ? "" : isMobile ? "500px" : "100%"}`,
          }}
          isMobile={isMobile}
        />
      )}
      {isMyProfile && (
        <FilterPosts isDesktopMedium={isDesktopMedium} isMobile={isMobile} />
      )}
      {myPosts?.map((post) => {
        const postTime = calcTime(post.time);
        return (
          <Post
            key={post.id}
            post={post}
            PostTime={postTime}
            style={{
              maxWidth: `${isDesktopMedium ? "" : isMobile ? "500px" : "100%"}`,
            }}
          />
        );
      })}
    </div>
  );
};

export default ProfileRightSide;
