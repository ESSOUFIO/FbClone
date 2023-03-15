import "./Saved.css";
import settingIcon from "../../assets/images/setting.png";
import SavedItemsIcon from "../../assets/images/savedItems.png";
import FavorisIcon from "../../assets/images/favoris.png";
import filterIcon from "../../assets/images/filter.png";
import { Button } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";

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

const Saved = () => {
  return (
    <div className="Saved">
      <SideMenu />
      <div className="SavedTitle">
        <div className="SubTitlePage">
          <h5>All</h5>
          <div>
            <div className="SavedFilter Center">
              <img
                src={filterIcon}
                width={20}
                alt=""
                style={{ filter: "invert(90%)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Saved;
