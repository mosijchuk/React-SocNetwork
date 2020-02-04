import React, { useState, useEffect } from "react";
import s from "./DialogMessage.module.scss";
import userPhoto from "../../../assets/img/user.jpg";

const DialogMessage = props => {
  const messageTime = props.date.split(["T"])[1].substr(0, 5);

  const [selected, setSelected] = useState(false);

  const selectMessage = () => {
    props.selectMessage(props.id);
    setSelected(true);
    props.checkEditMode();
  };

  const deselectMessage = () => {
    props.deselectMessage(props.id);
    setSelected(false);
    props.checkEditMode();
  };

  useEffect(() => {
    if (!props.editMode && selected) deselectMessage();
  }, [props.editMode]);

  return (
    <div
      className={`${s.messageWrap} ${!props.viewed && s.messageUnReaded} ${
        selected ? s.messageSelected : ""
      } ${props.editMode && s.messageEditMode}`}
      onClick={selected ? deselectMessage : selectMessage}
    >
      <div className={props.userType ? `${s.message} ${s.owner}` : s.message}>
        <img
          src={props.avatar ? props.avatar : userPhoto}
          alt="userPhoto"
          className={s.avatar}
        />
        <div className={s.messageText}>
          {props.message}
          <div className={s.date}>{messageTime}</div>
        </div>
      </div>
    </div>
  );
};

export default DialogMessage;
