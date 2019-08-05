import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./components/scss/App.scss";
import s from "./components/scss/components.module.scss";
import Header from "./components/Header/Header";
import Nav from "./components/Navbar/Nav";
import Profile from "./components/Profile/Profile";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";

const App = props => {
  return (
    <div className="app_wrapper">
      <Header />
      <div className={s.container}>
        <div className={s.page_wrap}>
          <Nav />
          <div className="content">
            <Route path="/profile" render={() => <Profile />} />
            <Route path="/dialogs" render={() => <DialogsContainer />} />
            <Route path="/users" render={() => <UsersContainer />} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
