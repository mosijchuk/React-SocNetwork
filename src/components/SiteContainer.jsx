import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Nav from "./Navbar/Nav";
import Profile from "./Profile/Profile";
import s from "./scss/components.module.scss";
import Dialogs from "./Dialogs/Dialogs";

const SiteContainer = props => {
  return (
    <BrowserRouter>
      <div className={s.container}>
        <div className={s.page_wrap}>
          <Nav state={props.state.navbar} />
          <div className="content">
            <Route
              path="/profile"
              render={() => <Profile state={props.state.profilePage} />}
            />
            <Route
              path="/dialogs"
              render={() => <Dialogs state={props.state.dialogsPage} />}
            />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default SiteContainer;
