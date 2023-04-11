import styles from "./Saved.module.css";
import settingIcon from "../../assets/images/setting.png";
import SavedItemsIcon from "../../assets/images/savedItems.png";
import FavorisIcon from "../../assets/images/favoris.png";
import filterIcon from "../../assets/images/filter.png";
import shareIcon from "../../assets/images/share2.png";
import unsaveIcon from "../../assets/images/unsave.png";
import plusIcon from "../../assets/images/plus2.png";
import { Button } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import { FiMoreHorizontal } from "react-icons/fi";
import { useGlobalState } from "../../context/GlobalProvider";
import { getUser } from "../../firebase/user";
import { useEffect, useState } from "react";
import { unSavePost } from "../../firebase/post";

const SideMenu = ({ isTablet }) => {
  return (
    <>
      {isTablet && (
        <div className={styles.SideMenu}>
          <div className="d-flex justify-content-between p-2">
            <h4 className="fw-bolder">Saved</h4>
            <div>
              <div className={styles.settingBtn}>
                <img
                  src={settingIcon}
                  alt=""
                  width={20}
                  style={{ filter: "invert(90%)" }}
                />
              </div>
            </div>
          </div>

          <div className={styles.menu}>
            <div className="d-inline-block">
              <div className={styles.SavedItemsIcon}>
                <img
                  src={SavedItemsIcon}
                  alt=""
                  style={{ filter: "invert(90%)" }}
                />
              </div>
            </div>
            <span className="fs-6 fw-bold">Saved Items</span>
          </div>

          <hr
            style={{
              margin: "10px 6px",
              borderTop: "1px solid var(--color-light)",
            }}
          />

          <h5 className="fs-6 fw-bold p-2">My Collection</h5>
          <div className={styles.myCollection}>
            <div className="d-inline-block">
              <div>
                <img src={FavorisIcon} alt="" width={35} className="rounded" />
              </div>
            </div>
            <span className="fs-6 fw-bold">Favoris</span>
          </div>

          <Button className={styles.NewCollectionBtn}>
            <FiPlus /> Create New Collection
          </Button>
        </div>
      )}
    </>
  );
};

const PostButtons = ({ unSavePostHandler, isDesktop, isMobile }) => {
  return (
    <>
      {isMobile && (
        <div
          className="d-flex gap-2 position-relative"
          style={{
            height: "40px",
            margin: "20px 10px 0 15px",
          }}
        >
          {isDesktop && (
            <div className={styles.PostSavedBtns} style={{ maxWidth: "230px" }}>
              Add to Collection
            </div>
          )}
          {!isDesktop && (
            <div className={styles.PostSavedBtns} style={{ maxWidth: "50px" }}>
              <img
                src={plusIcon}
                alt=""
                width={17}
                style={{ filter: "invert(90%)" }}
              />
            </div>
          )}
          <div
            className={styles.PostSavedBtns}
            style={{ fontSize: "20px", maxWidth: "50px" }}
          >
            <img
              src={shareIcon}
              alt=""
              width={17}
              style={{ filter: "invert(90%)" }}
            />
          </div>
          <div
            className={styles.PostSavedBtns}
            style={{
              fontSize: "20px",
              maxWidth: "50px",
              position: "relative",
            }}
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FiMoreHorizontal />
          </div>
          <DropDownUnSave unSavePostHandler={unSavePostHandler} />
        </div>
      )}
    </>
  );
};

const PostPhoto = ({ photo, isMobile, isMobileSmall }) => {
  return (
    <div
      className={styles.PostPhoto}
      style={{
        width: isMobile ? "130px" : isMobileSmall ? "90px" : "65px",
        height: isMobile ? "130px" : isMobileSmall ? "90px" : "65px",
      }}
    >
      <img src={photo} alt="" height={"100%"} />
    </div>
  );
};

const PostMobileBtn = ({ unSavePostHandler, isMobile }) => {
  return (
    <>
      {!isMobile && (
        <div
          style={{
            position: "absolute",
            right: "-3px",
            top: "-3px",
            zIndex: 5,
            background: "var(--color-darker)",
          }}
        >
          <div
            className={`${styles.PostMobileBtn} Center rounded`}
            style={{
              fontSize: "20px",
              maxWidth: "50px",
            }}
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FiMoreHorizontal />
          </div>
          <DropDownUnSave unSavePostHandler={unSavePostHandler} />
        </div>
      )}
    </>
  );
};

const PostSaved = ({ post, isDesktopMedium, isMobile, isMobileSmall }) => {
  const [userPost, setUserPost] = useState(null);
  const { user } = useGlobalState();

  const userName = userPost?.firstName + " " + userPost?.lastName;

  const unSavePostHandler = async () => {
    try {
      await unSavePost(user.uid, post.id);
    } catch (error) {}
  };

  useEffect(() => {
    getUser(post.uid).then((user) => setUserPost(user));
  }, [post.uid]);

  return (
    <>
      {userPost && (
        <div
          className={styles.PostSaved}
          style={{
            padding: isMobile ? "15px" : isMobileSmall ? "10px" : "5px",
          }}
        >
          {!!post.photo && <PostPhoto photo={post.photo} isMobile={isMobile} />}
          <div className="w-100 position-relative">
            <h5
              className={styles.PostSavedText}
              style={{
                width: isMobileSmall ? "100%" : "50vw",
                fontSize: isMobile ? "21px" : "17px",
                whiteSpace: isMobileSmall ? "normal" : "nowrap",
              }}
            >
              {post.text}
            </h5>

            <PostMobileBtn
              unSavePostHandler={unSavePostHandler}
              isMobile={isMobile}
            />

            <p className="my-2" style={{ fontSize: "13px" }}>
              <span style={{ color: "var(--color-light)" }}>
                Post<span style={{ padding: "0 3px" }}>•</span>Saved to{" "}
              </span>
              Favoris
            </p>

            {isMobileSmall && (
              <div>
                {
                  <img
                    src={userPost.picture}
                    alt=""
                    width={23}
                    style={{ borderRadius: "100%", marginRight: "10px" }}
                  />
                }
                {isMobile && (
                  <span
                    style={{
                      fontSize: "13px",
                      color: "var(--color-light)",
                    }}
                  >
                    Saved from{" "}
                  </span>
                )}
                <span>{userName}</span>
                <span style={{ fontWeight: "400" }}>'s Post</span>
              </div>
            )}

            <PostButtons
              unSavePostHandler={unSavePostHandler}
              isDesktop={isDesktopMedium}
              isMobile={isMobile}
            />
          </div>
        </div>
      )}
    </>
  );
};

const SubTitle = () => {
  return (
    <div className={`${styles.SubTitlePage} mb-2`}>
      <h5>All</h5>
      <div>
        <div className={styles.SavedFilter}>
          <img
            src={filterIcon}
            width={18}
            alt=""
            style={{ filter: "invert(90%)" }}
          />
        </div>
      </div>
    </div>
  );
};

const DropDownUnSave = ({ unSavePostHandler }) => {
  return (
    <div
      className={`${styles.DropDownUnSave} dropdown-menu`}
      onClick={unSavePostHandler}
    >
      <div className={styles.DropDownUnSaveItem}>
        <img src={unsaveIcon} alt="" style={{ filter: "invert(90%)" }} />
        <div
          style={{ fontSize: "18px", fontWeight: "600", paddingLeft: "15px" }}
        >
          Unsave
        </div>
      </div>
    </div>
  );
};

/** Saved Cmponent */
const Saved = () => {
  const {
    savedPosts,
    isDesktopLarge,
    isDesktopMedium,
    isTablet,
    isMobile,
    isMobileSmall,
  } = useGlobalState();

  return (
    <div className={styles.Saved}>
      <SideMenu isTablet={isTablet} />
      <div
        className={styles.SavedPosts}
        style={{
          padding: isDesktopMedium ? "25px" : isTablet ? "15px" : "8px",
        }}
      >
        <SubTitle />
        {!!savedPosts &&
          savedPosts.map((post) => {
            return (
              <PostSaved
                key={post.id}
                post={post}
                isDesktopLarge={isDesktopLarge}
                isTablet={isTablet}
                isMobile={isMobile}
                isMobileSmall={isMobileSmall}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Saved;
