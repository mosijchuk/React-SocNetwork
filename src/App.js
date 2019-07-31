import React from "react";
import "./components/scss/App.scss";
import Header from "./components/Header/Header";
import SiteContainer from "./components/SiteContainer";

const App = props => {
  return (
    <div className="app_wrapper">
      <Header />
      <SiteContainer
        store={props.store}
        dispatch={props.store.dispatch.bind(props.store)}
      />
    </div>
  );
};

export default App;
