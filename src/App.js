import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./components/scss/App.scss";
import s from "./components/scss/components.module.scss";
import Nav from "./components/Navbar/Nav";
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
// import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/LoginContainer";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router";
import Preloader from "./components/common/Preloader/Preloader";
import { initializeApp } from "./redux/appReducer";
import { withSuspense } from "./hoc/withSuspense";
import NotFound404 from "./components/404/404";
import NavContainer from "./components/Navbar/NavContainer";

const DialogsContainer = React.lazy(() =>
  import("./components/Dialogs/DialogsContainer")
);
const UsersContainer = React.lazy(() =>
  import("./components/Users/UsersContainer")
);

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader center={true} />;
    }
    return (
      <div className="app_wrapper">
        <HeaderContainer />
        <div className={s.container}>
          <div className={s.page_wrap}>
            <NavContainer />
            <div className="content">
              <Switch>
                <Route
                  path="/profile/:userId?"
                  render={() => <ProfileContainer />}
                />
                <Route
                  exact
                  path="/"
                  render={() => <Redirect to="/profile" />}
                />
                <Route
                  path="/dialogs/:dialogId?"
                  render={withSuspense(DialogsContainer)}
                />
                <Route path="/users" render={withSuspense(UsersContainer)} />
                <Route exact path="/login" render={() => <LoginContainer />} />
                <Route path="*" render={() => <NotFound404 />} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    initialized: state.app.initialized
  };
};

export default compose(
  connect(mapStateToProps, { initializeApp }),
  withRouter
)(App);
