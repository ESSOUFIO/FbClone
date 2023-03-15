import { NavbarLeft } from "../NavbarLeft/NavbarLeft";
import { NavbarMiddle } from "../NavbarMiddle/NavbarMiddle";
import { NavbarRight } from "../NavbarRight/NavbarRight";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="NavBar">
      <NavbarLeft />
      <NavbarMiddle />
      <NavbarRight />
    </div>
  );
};

export default NavBar;
