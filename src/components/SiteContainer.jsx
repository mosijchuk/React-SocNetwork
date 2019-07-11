import React from "react";
import Nav from "./Navbar/Nav";
import Profile from "./Profile/Profile";
import s from "./scss/components.module.scss";

const SiteContainer = () => {
  return (
    <div className={s.container}>
      <div className={s.page_wrap}>
        <Nav />
        <Profile />
      </div>
    </div>
  );
};

export default SiteContainer;
