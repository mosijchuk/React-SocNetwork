import React from "react";
import "./scss/App.scss";
import Header from "./components/Header";
import SiteContainer from "./components/SiteContainer";

const App = () => {
  return (
    <div className="app-wrapper">
      <Header />
      <SiteContainer />
    </div>
  );
};

export default App;
