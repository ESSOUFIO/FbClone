import "./NavbarLeft.css";
import logo from "../../assets/images/logo.png";
import { FiSearch } from "react-icons/fi";

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

export const NavbarLeft = () => {
  return (
    <div className="NavbarLeft">
      <img src={logo} alt="" />
      <Search />
    </div>
  );
};
