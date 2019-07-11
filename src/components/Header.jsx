import React from "react";
import s from "./scss/header.module.scss";

const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.container}>
        <div className={s.header_wrap}>
          <div className={s.header_wrap__brand}>
            <a href="#">
              <img src="./../img/logo.svg" alt="" />
            </a>
          </div>
          <div className={s.header_wrap__buttons}>
            <a href="#">Logout</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
