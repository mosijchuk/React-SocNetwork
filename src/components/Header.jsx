import React from "react";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-wrap">
          <div className="header-wrap__brand">
            <a href="#">
              <img src="./../img/logo.svg" alt="" />
            </a>
          </div>
          <div className="header-wrap__buttons">
            <a href="#">Logout</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
