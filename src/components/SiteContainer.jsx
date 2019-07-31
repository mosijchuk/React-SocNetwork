import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Nav from "./Navbar/Nav";
import Profile from "./Profile/Profile";
import s from "./scss/components.module.scss";
import Dialogs from "./Dialogs/Dialogs";

const SiteContainer = props => {
  return (
    <div className={s.container}>
      <div className={s.page_wrap}>
        <Nav state={props.store.getState().navbar} />
        <div className="content">
          <Route
            path="/profile"
            render={() => (
              <Profile
                state={props.store.getState().profilePage}
                dispatch={props.store.dispatch.bind(props.store)}
              />
            )}
          />
          <Route
            path="/dialogs"
            render={() => (
              <Dialogs
                state={props.store.getState().dialogsPage}
                dispatch={props.store.dispatch.bind(props.store)}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default SiteContainer;
