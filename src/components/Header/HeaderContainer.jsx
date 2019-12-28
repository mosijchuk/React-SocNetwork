import React from "react";
import { connect } from "react-redux";
import { authMe } from "../../redux/authReducer";
import Header from "./Header";
import { Redirect } from "react-router-dom";
import { AuthAPI } from "../../API/api";

class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authFalse: false
    };
  }
  componentDidMount() {
    if (this.props.authMe()) {
      this.setState({
        authFalse: !this.props.isLogged
      });
    }
  }
  render() {
    return (
      <div>
        {this.state.authFalse ? <Redirect push to="/login" /> : ""}
        <Header {...this.props} />
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    isLogged: state.auth.isLogged
  };
};

export default connect(
  mapStateToProps,
  { authMe }
)(HeaderContainer);
