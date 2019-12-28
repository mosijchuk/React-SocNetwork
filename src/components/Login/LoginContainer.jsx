import React from "react";
import Login from "./Login";
import s from "./Login.module.scss";
import { setAuthUserData } from "../../redux/authReducer";
import { connect } from "react-redux";

class LoginContainer extends React.Component {
  render() {
    return (
      <div className={s.content}>
        <div className={s.contentArea}>
          <Login />
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => ({
  username: state.auth.login,
  isLogged: state.auth.isLogged
});

export default connect(
  mapStateToProps,
  { setAuthUserData }
)(LoginContainer);
