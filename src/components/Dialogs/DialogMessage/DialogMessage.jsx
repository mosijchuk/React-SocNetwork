import React from "react";
import s from "./DialogMessage.module.scss";

const DialogMessage = props => {
  return (
    <div className={s.messageWrap}>
      <div className={props.userType ? `${s.message} ${s.owner}` : s.message}>
        <img src={props.avatar} alt="" className={s.avatar} />
        <div className={s.messageText}>
          {props.message}
          <div className={s.date}>{props.date}</div>
        </div>
      </div>
    </div>
  );
};

export default DialogMessage;
