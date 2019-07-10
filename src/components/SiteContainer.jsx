import React from "react";
import Nav from "./Nav";
import Profile from "./Profile";

const SiteContainer = () => {
  return (
    <div className="container">
      <div className="page-wrap">
        <Nav />
        <Profile />
      </div>
    </div>
  );
};

export default SiteContainer;
