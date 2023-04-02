import "./NavbarLeft.css";
import logo from "../../../assets/images/fbLogo-light.png";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import menuIcon from "../../../assets/images/menu.png";
import { useMediaQuery } from "react-responsive";

/** Internal Component */
const Search = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1260px)",
  });
  return (
    <div
      className="Search"
      style={{ width: `${isDesktopOrLaptop ? "100%" : "12%"}` }}
    >
      <div className="SearchIcon">
        <FiSearch />
      </div>
      {isDesktopOrLaptop && <input type="text" placeholder="Search Facebook" />}
    </div>
  );
};

const NavbarMiddleIcon = ({ icon, width, style, onClick }) => {
  return (
    <div className="MainIcons" onClick={onClick}>
      <img src={icon} alt="" width={width} style={style} />
    </div>
  );
};

/*** ======= NavbarLeft ===== */
export const NavbarLeft = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({
    query: "(min-width: 700px)",
  });
  return (
    <div className="NavbarLeft">
      <img src={logo} alt="" onClick={() => navigate("/")} />
      <Search />
      {!isMobile && (
        <NavbarMiddleIcon
          icon={menuIcon}
          width={34}
          style={{ filter: "invert(80%)" }}
        />
      )}
    </div>
  );
};
