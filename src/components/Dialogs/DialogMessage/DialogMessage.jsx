import React, { useState, useEffect } from "react";
import s from "./DialogMessage.module.scss";
import userPhoto from "../../../assets/img/user.jpg";
import { NavLink } from "react-router-dom";

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

  let userAvatar = props.userType ? props.ownerPhoto : props.companionPhoto;

  const getMeta = avatar => {
    const img = new Image();
    img.onload = function() {
      if (!this.width > 0) {
        userAvatar = false;
      }
    };
    img.src = avatar;
  };

  //check avatar
  getMeta(userAvatar);

  return (
    <div
      className={`${s.messageWrap} ${!props.viewed && s.messageUnReaded} ${
        selected ? s.messageSelected : ""
      } ${props.editMode && s.messageEditMode}`}
      onClick={selected ? deselectMessage : selectMessage}
    >
      <div className={props.userType ? `${s.message} ${s.owner}` : s.message}>
        <NavLink to={`/profile/${props.senderId}`}>
          <img
            src={userAvatar ? userAvatar : userPhoto}
            alt="userPhoto"
            className={s.avatar}
          />
        </NavLink>
        <div className={s.messageText}>
          {props.message}
          <div className={s.date}>{messageTime}</div>
        </div>
      </div>
    </div>
  );
};

export default DialogMessage;
