import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import Nav from "./Nav";
import { checkNewMessages } from "../../redux/dialogsReducer";

let mapStateToProps = state => {
  return {};
};

export default compose(
  connect(mapStateToProps, {
    checkNewMessages
  }),
  withRouter
)(Nav);
