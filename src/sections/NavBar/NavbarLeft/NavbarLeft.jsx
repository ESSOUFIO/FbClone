import "./NavbarLeft.css";
import logo from "../../../assets/images/fbLogo-light.png";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import menuIcon from "../../../assets/images/menu.png";
import { useMediaQuery } from "react-responsive";
import menuIconActive from "../../../assets/images/menu-active.png";

/** Internal Component */
const Search = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1260px)",
  });
  return (
    <div
      className="Search"
      style={{ width: `${isDesktopOrLaptop ? "100%" : "37px"}` }}
    >
      <div className="SearchIcon">
        <FiSearch />
      </div>
      {isDesktopOrLaptop && <input type="text" placeholder="Search Facebook" />}
    </div>
  );
};

const NavbarMenuIcon = ({ icon, iconActive, width, active, onClick }) => {
  return (
    <div className={` ${active ? "MenuIconWrapActive" : "MenuIconWrap"}`}>
      <div
        className={` ${active ? "MenuIconActive" : "MenuIcon"}`}
        onClick={onClick}
      >
        {!active && (
          <img
            src={icon}
            alt=""
            width={width}
            style={{ filter: "invert(80%)" }}
          />
        )}
        {active && <img src={iconActive} alt="" width={width} />}
      </div>
    </div>
  );
};

/*** ======= NavbarLeft ===== */
export const NavbarLeft = ({ navBtn, btnClicked }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({
    query: "(min-width: 700px)",
  });
  return (
    <div className="NavbarLeft">
      <img
        src={logo}
        alt=""
        onClick={() => {
          navigate("/");
          btnClicked(navBtn[1].name);
        }}
        style={{ marginLeft: `${isMobile ? "10px" : "8px"}` }}
      />
      <Search />
      {!isMobile && (
        <NavbarMenuIcon
          icon={menuIcon}
          iconActive={menuIconActive}
          width={34}
          active={navBtn[6].active}
          onClick={() => {
            navigate("/bookmarks");
            btnClicked(navBtn[6].name);
          }}
        />
      )}
    </div>
  );
};
