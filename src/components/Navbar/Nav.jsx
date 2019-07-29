import React from "react";
import MaterialIcon, { colorPalette } from "material-icons-react";
import s from "./Nav.module.scss";
import { NavLink } from "react-router-dom";
import NavFriends from "./NavFriends/NavFriends";

const Nav = props => {
  return (
    <nav className={s.nav}>
      <div className={s.nav_item}>
        <MaterialIcon icon="person" size={18} />
        <NavLink to="/profile" activeClassName={s.active}>
          Profile
        </NavLink>
      </div>
      <div className={s.nav_item}>
        <MaterialIcon icon="mail" size={18} />
        <NavLink to="/dialogs" activeClassName={s.active}>
          Messages
        </NavLink>
      </div>
      <div className={s.nav_item}>
        <MaterialIcon icon="filter_none" size={18} />
        <NavLink to="/news" activeClassName={s.active}>
          News
        </NavLink>
      </div>
      <div className={s.nav_item}>
        <MaterialIcon icon="music_note" size={18} />
        <NavLink to="/music" activeClassName={s.active}>
          Music
        </NavLink>
      </div>
      <div className={s.nav_item}>
        <MaterialIcon icon="settings" size={18} />
        <NavLink to="/settings" activeClassName={s.active}>
          Settings
        </NavLink>
      </div>

      <NavFriends state={props.state.navFriends} />
    </nav>
  );
};

export default Nav;
