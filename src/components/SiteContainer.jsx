import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Nav from "./Navbar/Nav";
import Profile from "./Profile/Profile";
import s from "./scss/components.module.scss";
import DialogsContainer from "./Dialogs/DialogsContainer";

const SiteContainer = props => {
  return (
    <div className={s.container}>
      <div className={s.page_wrap}>
        <Nav store={props.store} />
        <div className="content">
          <Route
            path="/profile"
            render={() => <Profile store={props.store} />}
          />
          <Route
            path="/dialogs"
            render={() => <DialogsContainer store={props.store} />}
          />
        </div>
      </div>
    </div>
  );
};

export default SiteContainer;
