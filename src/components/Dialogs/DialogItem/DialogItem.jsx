import React from "react";
import s from "./DialogItem.module.scss";
import { NavLink } from "react-router-dom";

const DialogItem = props => {
  return (
    <div>
      <NavLink to={"/dialogs/" + props.userId} className={s.dialogItem}>
        <img src={props.avatar} alt="" className={s.avatar} />
        <span className={s.userName}>{props.userName}</span>
        <span className={s.postDate}>{props.postDate}</span>
      </NavLink>
    </div>
  );
};

export default DialogItem;
