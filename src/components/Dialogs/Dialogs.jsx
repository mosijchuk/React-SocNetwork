import React from "react";
import MaterialIcon, { colorPalette } from "material-icons-react";
import s from "./dialogs.module.scss";
import DialogItem from "./DialogItem/DialogItem";
import DialogMessage from "./DialogMessage/DialogMessage";
import { Field, reduxForm } from "redux-form";

const DialogForm = props => {
  return (
    <form
      onSubmit={props.handleSubmit}
      onKeyDown={event => {
        if (event.keyCode === 13) {
          event.preventDefault();
          props.handleSubmit();
        }
      }}
    >
      <MaterialIcon icon="attach_file" size={18} />
      <Field
        component={"input"}
        type={"text"}
        name={"message_text"}
        placeholder={"Message..."}
        autoComplete={"off"}
      />
      <button type="submit">
        <MaterialIcon icon="send" size={24} />
      </button>
    </form>
  );
};

const DialogReduxForm = reduxForm({
  form: "dialogMessage"
})(DialogForm);

const Dialogs = props => {
  let dialogElements = props.dialogs.map(dialog => (
    <DialogItem
      avatar={dialog.avatar}
      userId={dialog.userId}
      userName={dialog.userName}
      postDate={dialog.postDate}
    />
  ));

  let dialogMessageElements = props.messages.map(message => (
    <DialogMessage
      avatar={message.avatar}
      userId={message.userId}
      message={message.message}
      date={message.date}
      userType={message.userType}
    />
  ));

  let onSubmit = message => {
    props.sendMessage(message);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.contentArea}>
        <div className={s.dialogsList}>{dialogElements}</div>
      </div>
      <div className={s.contentArea}>
        <div className={s.dialogArea}>
          {dialogMessageElements}
          <div className={s.postMessage}>
            <DialogReduxForm onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
