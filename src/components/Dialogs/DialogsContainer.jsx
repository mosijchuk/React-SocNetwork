import React from "react";
import {
  sendMessageActionCreator,
  updateNewMessageBodyActionCreator
} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";

const DialogsContainer = props => {
  let state = props.store.getState().dialogsPage;

  let sendMessage = () => {
    props.store.dispatch(sendMessageActionCreator());
  };

  let updateNewMessageBody = body => {
    props.store.dispatch(updateNewMessageBodyActionCreator(body));
  };

  return (
    <Dialogs
      dialogs={state.dialogs}
      messages={state.messages}
      sendMessage={sendMessage}
      updateMessage={updateNewMessageBody}
      messageText={state.newMessageText}
    />
  );
};

export default DialogsContainer;
