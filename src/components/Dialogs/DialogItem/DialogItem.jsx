import React from "react";
import s from "./DialogItem.module.scss";
import { NavLink } from "react-router-dom";
import userPhoto from "../../../assets/img/user.jpg";
import MaterialIcon, { colorPalette } from "material-icons-react";

const DialogItem = props => {
  const dialogLastTime = props.lastActivity.split(["T"])[1].substr(0, 5);
  return (
    <div>
      <NavLink
        to={"/dialogs/" + props.userId}
        className={`
        ${s.dialogItem} ${props.selected && s.selected} 
        ${props.hasNewMessages && s.hasNewMessages}
        `}
      >
        <img
          src={props.avatar ? props.avatar : userPhoto}
          alt="userPhoto"
          className={s.avatar}
        />
        <span className={s.userName}>{props.userName}</span>
        {props.selected ? (
          <span className={s.selectedDialogIcon}>
            <MaterialIcon icon="label_important" size={18} />
          </span>
        ) : (
          <>
            {props.newMessagesCount > 0 ? (
              <span className={s.sticker}>{props.newMessagesCount}</span>
            ) : (
              <span className={s.postDate}>{dialogLastTime}</span>
            )}
          </>
        )}
      </NavLink>
    </div>
  );
};

export default DialogItem;
