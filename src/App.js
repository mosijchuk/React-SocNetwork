import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./components/scss/App.scss";
import s from "./components/scss/components.module.scss";
import Nav from "./components/Navbar/Nav";
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
// import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/LoginContainer";
import { compose } from "../../../../../../Users/aleksandr/Library/Caches/typescript/3.6/node_modules/redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Preloader from "./components/common/Preloader/Preloader";
import { initializeApp } from "./redux/appReducer";
import { withSuspense } from "./hoc/withSuspense";

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
      return <Preloader />;
    }
    return (
      <div className="app_wrapper">
        <HeaderContainer />
        <div className={s.container}>
          <div className={s.page_wrap}>
            <Nav />
            <div className="content">
              <Route
                path="/profile/:userId?"
                render={() => <ProfileContainer />}
              />
              <Route path="/dialogs" render={withSuspense(DialogsContainer)} />
              <Route path="/users" render={withSuspense(UsersContainer)} />
              <Route path="/login" render={() => <LoginContainer />} />
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

let mapDispatchToProps = dispatch => {
  return {};
};

export default compose(
  connect(mapStateToProps, { initializeApp }),
  withRouter
)(App);
