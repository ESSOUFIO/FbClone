import "./Saved.css";
import settingIcon from "../../assets/images/setting.png";
import SavedItemsIcon from "../../assets/images/savedItems.png";
import FavorisIcon from "../../assets/images/favoris.png";
import filterIcon from "../../assets/images/filter.png";
import shareIcon from "../../assets/images/share2.png";
import unsaveIcon from "../../assets/images/unsave.png";
import { Button } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import { FiMoreHorizontal } from "react-icons/fi";
import { useGlobalState } from "../../context/GlobalProvider";
import { getUser } from "../../firebase/user";
import { useEffect, useState } from "react";
import { unSavePost } from "../../firebase/post";

const SideMenu = () => {
  return (
    <div className="SideMenu">
      <div className="d-flex justify-content-between p-2">
        <h4 className="fw-bolder">Saved</h4>
        <div>
          <div className="settingBtn">
            <img
              src={settingIcon}
              alt=""
              width={20}
              style={{ filter: "invert(90%)" }}
            />
          </div>
        </div>
      </div>

      <div className="menu">
        <div className="d-inline-block">
          <div className="SavedItemsIcon">
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
      <div className="myCollection">
        <div className="d-inline-block">
          <div className="">
            <img src={FavorisIcon} alt="" width={35} className="rounded" />
          </div>
        </div>
        <span className="fs-6 fw-bold">Favoris</span>
      </div>

      <Button className="NewCollectionBtn">
        <FiPlus /> Create New Collection
      </Button>
    </div>
  );
};

const PostSaved = ({ post }) => {
  const [user, setUser] = useState(null);
  const [showDropDown, setShowDropDown] = useState(false);
  const userName = user?.firstName + " " + user?.lastName;

  const unSavePostHandler = async () => {
    try {
      await unSavePost(post.uid, post.id);
    } catch (error) {}
  };

  useEffect(() => {
    getUser(post.uid).then((user) => setUser(user));
  }, [post.uid]);

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  return (
    <>
      {user && (
        <div className="PostSaved" onClick={toggleDropDown}>
          {!!post.photo && (
            <div
              style={{
                width: "130px",
                height: "130px",
                borderRadius: "8px",
                overflow: "hidden",
                flex: "0 0 130px",
              }}
            >
              <img src={post.photo} alt="" height={"100%"} />
            </div>
          )}
          <div className="w-100">
            <h5 style={{ fontWeight: "700" }}>{post.text}</h5>

            <p className="my-2" style={{ fontSize: "13px" }}>
              <span style={{ color: "var(--color-light)" }}>
                Post<span style={{ padding: "0 3px" }}>•</span>Saved to{" "}
              </span>
              Favoris
            </p>

            <div>
              <img
                src={user.picture}
                alt=""
                width={23}
                style={{ borderRadius: "100%" }}
              />
              <span
                style={{
                  fontSize: "13px",
                  color: "var(--color-light)",
                  marginLeft: "10px",
                }}
              >
                Saved from{" "}
              </span>
              <span>{userName}'s Post</span>
            </div>

            <div
              className="d-flex gap-2 position-relative"
              style={{
                height: "40px",
                margin: "20px 10px 0 15px",
              }}
            >
              <div
                className="PostSavedBtns Center"
                style={{ maxWidth: "230px" }}
              >
                Add to Collection
              </div>
              <div
                className="PostSavedBtns Center"
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
                className="PostSavedBtns Center"
                style={{
                  fontSize: "20px",
                  maxWidth: "50px",
                  position: "relative",
                }}
                onClick={toggleDropDown}
              >
                <FiMoreHorizontal />
              </div>
              <DropDownUnSave
                showDropDown={showDropDown}
                unSavePostHandler={unSavePostHandler}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const SubTitle = () => {
  return (
    <div className="SubTitlePage mb-2">
      <h5>All</h5>
      <div>
        <div className="SavedFilter Center">
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

const DropDownUnSave = ({ showDropDown, unSavePostHandler }) => {
  return (
    <div
      className="DropDownUnSave"
      style={{ visibility: `${showDropDown ? "visible" : "hidden"}` }}
      onClick={unSavePostHandler}
    >
      <div className="DropDownUnSaveItem">
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
  const { savedPosts } = useGlobalState();
  return (
    <div className="Saved">
      <SideMenu />
      <div className="SavedPosts">
        <SubTitle />
        {!!savedPosts &&
          savedPosts.map((post) => {
            return <PostSaved key={post.id} post={post} />;
          })}
      </div>
    </div>
  );
};

export default Saved;
