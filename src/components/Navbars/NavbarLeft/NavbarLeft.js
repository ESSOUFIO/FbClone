import "./NavbarLeft.css";
import logo from "../../../assets/images/fbLogo-light.png";
import { FiSearch } from "react-icons/fi";

/** Internal Component */
const Search = () => {
  return (
    <div className="Search">
      <div className="SearchIcon">
        <FiSearch />
      </div>
      <input type="text" placeholder="Search Smile" />
    </div>
  );
};

/*** ======= NavbarLeft ===== */
export const NavbarLeft = () => {
  return (
    <div className="NavbarLeft">
      <img src={logo} alt="" />
      <Search />
    </div>
  );
};
