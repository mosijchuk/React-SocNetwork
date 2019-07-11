import React from "react";
import MaterialIcon, { colorPalette } from "material-icons-react";
import s from "./nav.module.scss";

const Nav = () => {
  return (
    <nav className={s.nav}>
      <div className={s.nav_item}>
        <MaterialIcon icon="person" size={18} />
        <a href="#Profile">Profile</a>
      </div>
      <div className={s.nav_item}>
        <MaterialIcon icon="mail" size={18} />
        <a href="#Messages">Messages</a>
      </div>
      <div className={s.nav_item}>
        <MaterialIcon icon="filter_none" size={18} />
        <a href="#News">News</a>
      </div>
      <div className={s.nav_item}>
        <MaterialIcon icon="music_note" size={18} />
        <a href="#Music">Music</a>
      </div>
      <div className={s.nav_item}>
        <MaterialIcon icon="settings" size={18} />
        <a href="#Settings">Settings</a>
      </div>
    </nav>
  );
};

export default Nav;
