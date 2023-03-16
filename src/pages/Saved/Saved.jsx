import "./Saved.css";
import settingIcon from "../../assets/images/setting.png";
import SavedItemsIcon from "../../assets/images/savedItems.png";
import FavorisIcon from "../../assets/images/favoris.png";
import filterIcon from "../../assets/images/filter.png";
import exampleImg from "../../assets/images/scenery.jpg";
import profileImg from "../../assets/images/omar.jpg";
import shareIcon from "../../assets/images/share2.png";
import { Button } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import { TbPoint } from "react-icons/tb";
import { FiMoreHorizontal } from "react-icons/fi";

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

const PostSaved = () => {
  return (
    <div className="PostSaved">
      <div
        style={{
          width: "130px",
          height: "130px",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <img src={exampleImg} alt="" height={"100%"} />
      </div>
      <div className="w-100">
        <h5 style={{ fontWeight: "700" }}>Bla Bla Text Blad</h5>

        <p className="my-2" style={{ fontSize: "13px" }}>
          <span style={{ color: "var(--color-light)" }}>
            Post <TbPoint /> Saved to{" "}
          </span>
          Favoris
        </p>

        <div>
          <img
            src={profileImg}
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
          <span>CNN's Post</span>
        </div>

        <div
          className="d-flex gap-2"
          style={{ height: "40px", margin: "20px 10px 0 15px" }}
        >
          <div className="PostSavedBtns Center" style={{ maxWidth: "230px" }}>
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
            style={{ fontSize: "20px", maxWidth: "50px" }}
          >
            <FiMoreHorizontal />
          </div>
        </div>
      </div>
    </div>
  );
};

const SubTitle = () => {
  return (
    <div className="SubTitlePage">
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

const Saved = () => {
  return (
    <div className="Saved">
      <SideMenu />
      <div className="SavedPosts">
        <SubTitle />
        <PostSaved />
      </div>
    </div>
  );
};

export default Saved;
