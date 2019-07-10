import React from "react";
import MaterialIcon, { colorPalette } from "material-icons-react";

const Nav = () => {
  return (
    <nav className="nav">
      <div className="nav-item">
        <MaterialIcon icon="person" size={18} />
        <a href="#Profile">Profile</a>
      </div>
      <div className="nav-item">
        <MaterialIcon icon="mail" size={18} />
        <a href="#Messages">Messages</a>
      </div>
      <div className="nav-item">
        <MaterialIcon icon="filter_none" size={18} />
        <a href="#News">News</a>
      </div>
      <div className="nav-item">
        <MaterialIcon icon="music_note" size={18} />
        <a href="#Music">Music</a>
      </div>
      <div className="nav-item">
        <MaterialIcon icon="settings" size={18} />
        <a href="#Settings">Settings</a>
      </div>
    </nav>
  );
};

export default Nav;
