import React from "react";
import "./components/scss/App.scss";
import Header from "./components/Header/Header";
import SiteContainer from "./components/SiteContainer";

const App = props => {
  return (
    <div className="app_wrapper">
      <Header />
      <SiteContainer state={props.state} />
    </div>
  );
};

export default App;
