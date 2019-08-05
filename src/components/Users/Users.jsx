import React from "react";
import s from "./Users.module.scss";
import * as axios from "axios";
import userPhoto from "../../assets/img/user.jpg";

const Users = props => {
  if (props.users.length === 0) {
    axios
      .get("https://social-network.samuraijs.com/api/1.0/users")
      .then(response => {
        props.setUsers(response.data.items);
      });
  }
  return (
    <div className={s.content}>
      <div className={s.contentArea}>
        <div className={s.header}>
          <h2>Users</h2>
          <p className={s.usersCount}>{props.usersCount}</p>
        </div>
        <div className={s.usersWrap}>
          {props.users.map(u => (
            <div className={s.user} key={u.id}>
              <a href="#" className={s.avatar}>
                <img
                  src={u.photos.small != null ? u.photos.small : userPhoto}
                  alt="avatar"
                />
              </a>
              <div className={s.userInfo}>
                <a href="#" className={s.userName}>
                  {u.name}
                </a>
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
                      props.unfollow(u.id);
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
                      props.follow(u.id);
                    }}
                  >
                    Follow
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
