import "./NavbarLeft.css";
import logo from "../../../assets/images/fbLogo-light.png";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

/** Internal Component */
const Search = () => {
  return (
    <div className="Search">
      <div className="SearchIcon">
        <FiSearch />
      </div>
      <input type="text" placeholder="Search Facebook" />
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
