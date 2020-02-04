import React, { useState, useEffect } from "react";
import MaterialIcon, { colorPalette } from "material-icons-react";
import s from "./dialogs.module.scss";
import DialogItem from "./DialogItem/DialogItem";
import DialogMessage from "./DialogMessage/DialogMessage";
import { Field, reduxForm } from "redux-form";
import Preloader from "../common/Preloader/Preloader";

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

let formName = "profileDialogMessage";

const DialogReduxForm = reduxForm({
  form: formName
})(DialogForm);

const Dialogs = props => {
  let [dialogsIsLoaded, setDialogsLoaded] = useState(false);
  const dialogId = props.match.params.dialogId;

  const cancelSelectMessages = () => {
    props.cancelSelectMessages();
    props.checkEditMode();
  };

  const deleteSelectMessages = () => {
    props.deleteSelectedMessages();
  };

  useEffect(() => {
    if (!dialogsIsLoaded) {
      props.getDialogs().then(() => {
        setDialogsLoaded(true);
      });
    }
  }, []);

  useEffect(() => {
    if (dialogId) {
      props.setDialog(dialogId);
    }
  }, [dialogId]);

  let dialogElements = props.dialogs.map(dialog => (
    <DialogItem
      key={dialog.id}
      avatar={dialog.photos.small}
      userId={dialog.id}
      userName={dialog.userName}
      hasNewMessages={dialog.hasNewMessages}
      lastActivity={dialog.lastDialogActivityDate}
      newMessagesCount={dialog.newMessagesCount}
      selected={props.match.params.dialogId == dialog.id}
    />
  ));

  let dialogMessageElements = props.messages.map(message => (
    <DialogMessage
      key={message.id}
      id={message.id}
      avatar={message.avatar}
      userId={message.userId}
      message={message.body}
      date={message.addedAt}
      userType={message.senderId == props.ownerId && "owner"}
      viewed={message.viewed}
      selected={false}
      selectMessage={props.selectMessage}
      deselectMessage={props.deselectMessage}
      checkEditMode={props.checkEditMode}
      editMode={props.editMode.status}
    />
  ));

  let onSubmit = message => {
    props.sendMessage(dialogId, message.message_text, formName);
  };

  return (
    <div className={`${s.dialogs} ${dialogId && s.active}`}>
      <div className={s.contentArea}>
        <div className={s.dialogsList}>
          {props.isLoadingDialogs ? (
            <Preloader center={true} inner={true} />
          ) : (
            <>{dialogElements}</>
          )}
        </div>
      </div>
      <div className={s.contentArea}>
        {dialogId ? (
          <div className={s.dialogArea}>
            {props.isLoadingMessages ? (
              <Preloader center={true} inner={true} />
            ) : (
              <>{dialogMessageElements}</>
            )}

            <div className={s.postMessage}>
              {props.editMode.status ? (
                <div className={s.selectActionWrap}>
                  <a
                    href="#"
                    className={s.cancelSelect}
                    onClick={cancelSelectMessages}
                  >
                    <small>Cancel</small>
                  </a>

                  <small>
                    <b>
                      {props.editMode.count} message
                      {props.editMode.count > 1 ? "s" : ""} selected
                    </b>
                  </small>

                  <a
                    href="#"
                    className={s.deleteSelected}
                    onClick={deleteSelectMessages}
                  >
                    <MaterialIcon icon="delete_forever" size={18} />
                    <small>Delete selected</small>
                  </a>
                </div>
              ) : (
                <DialogReduxForm onSubmit={onSubmit} />
              )}
            </div>
          </div>
        ) : (
          <div className={s.emptyDialog}>
            <MaterialIcon icon="touch_app" size={88} />
            <p>Select dialogue</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dialogs;
