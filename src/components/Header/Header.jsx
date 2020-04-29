import React from "react";
import { NavLink } from "react-router-dom";
import s from "./header.module.scss";
// import logo from "./../../assets/img/";

const Header = props => {
  return (
    <header className={s.header}>
      <div className={s.container}>
        <div className={s.header_wrap}>
          <div className={s.header_wrap__brand}>
            <a href="#">{/* <img src={logo} alt="ReactNetwork" /> */}</a>
          </div>

          {!props.isLogged ? (
            <div className={s.header_wrap__buttons}>
              <NavLink to="/login">Login</NavLink>
            </div>
          ) : (
            <div className={s.header_wrap__buttons}>
              <NavLink to="/users">All users</NavLink>

              <a href="#" onClick={props.logout}>
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
