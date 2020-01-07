import React from "react";
import { connect } from "react-redux";
import { sendMessage } from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

let mapStateToProps = state => {
  return {
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
    messageText: state.dialogsPage.newMessageText
  };
};

let mapDispatchToProps = dispatch => {
  return {};
};

export default compose(
  connect(mapStateToProps, { sendMessage }),
  withAuthRedirect
)(Dialogs);
