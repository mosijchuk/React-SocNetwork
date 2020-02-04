import React from "react";
import s from "./Users.module.scss";
import userPhoto from "../../assets/img/user.jpg";
import { NavLink } from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";

let User = ({ u, follow, unfollow, ...props }) => {
  return (
    <div className={s.user} key={u.id}>
      <NavLink to={"/profile/" + u.id} className={s.avatar}>
        <img
          src={u.photos.small != null ? u.photos.small : userPhoto}
          alt="avatar"
        />
      </NavLink>
      <div className={s.userInfo}>
        <NavLink to={"/profile/" + u.id} className={s.userName}>
          {u.name}
        </NavLink>
        <p className={s.location}>Kyiv, Ukraine</p>
        <p className={s.status}>{u.status}</p>
      </div>
      <div className={s.followWrap}>
        {u.followed ? (
          <a
            href="#"
            className={`${s.btn_b} ${s.selected}`}
            onClick={e => {
              e.preventDefault();
              unfollow(u.id);
            }}
          >
            Unfollow
          </a>
        ) : (
          <a
            href="#"
            className={s.btn_b}
            onClick={e => {
              e.preventDefault();
              follow(u.id);
            }}
          >
            Follow
          </a>
        )}
      </div>
    </div>
  );
};

export default User;
