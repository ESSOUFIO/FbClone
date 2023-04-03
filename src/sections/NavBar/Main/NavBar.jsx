import { useState } from "react";
import { NavbarLeft } from "../NavbarLeft/NavbarLeft";
import { NavbarMiddle } from "../NavbarMiddle/NavbarMiddle";
import { NavbarRight } from "../NavbarRight/NavbarRight";
import "./NavBar.css";

const NavBar = () => {
  const [navBtn, setNavBtn] = useState([
    {
      name: "menu1",
      active: false,
    },
    {
      name: "home",
      active: true,
    },
    {
      name: "watch",
      active: false,
    },
    {
      name: "marketplace",
      active: false,
    },
    {
      name: "groups",
      active: false,
    },
    {
      name: "game",
      active: false,
    },
    {
      name: "menu2",
      active: false,
    },
    {
      name: "profile",
      active: false,
    },
  ]);

  const btnClicked = (name) => {
    const menu = [];
    navBtn.forEach((el) => {
      if (el.name === name) {
        menu.push({ name: el.name, active: true });
      } else menu.push({ name: el.name, active: false });
    });
    setNavBtn(menu);
  };
  return (
    <div className="NavBar">
      <NavbarLeft navBtn={navBtn} btnClicked={btnClicked} />
      <NavbarMiddle navBtn={navBtn} btnClicked={btnClicked} />
      <NavbarRight btnClicked={btnClicked} />
    </div>
  );
};

export default NavBar;
