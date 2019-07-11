import React from "react";
import "./components/scss/App.scss";
import Header from "./components/Header/Header";
import SiteContainer from "./components/SiteContainer";

const App = () => {
  return (
    <div className="app_wrapper">
      <Header />
      <SiteContainer />
    </div>
  );
};

export default App;
