import React from "react";
import Login from "./Login";
import s from "./Login.module.scss";
import { connect } from "react-redux";
import { loginMe } from "../../redux/authReducer";
import { Redirect } from "react-router-dom";

class LoginContainer extends React.Component {
  render() {
    if (this.props.isLogged) {
      return <Redirect to="/profile" />;
    }
    return (
      <div className={s.content}>
        <div className={s.contentArea}>
          <Login {...this.props} />
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => ({
  username: state.auth.login,
  isLogged: state.auth.isLogged,
  loading: state.profilePage.loading
});

export default connect(mapStateToProps, { loginMe })(LoginContainer);
