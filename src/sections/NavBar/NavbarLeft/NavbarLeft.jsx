import "./NavbarLeft.css";
import logo from "../../../assets/images/fbLogo-light.png";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
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

/*** ======= NavbarLeft ===== */
export const NavbarLeft = () => {
  const navigate = useNavigate();
  return (
    <div className="NavbarLeft">
      <img src={logo} alt="" onClick={() => navigate("/")} />
      <Search />
    </div>
  );
};
