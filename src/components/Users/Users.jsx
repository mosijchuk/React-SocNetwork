import React from "react";
import s from "./Users.module.scss";
import userPhoto from "../../assets/img/user.jpg";
import { NavLink } from "react-router-dom";

const Users = props => {
  return (
    <div className={s.content}>
      <div className={s.contentArea}>
        <div className={s.sectionHeader}>
          <h2>Users</h2>
          <p className={s.secondary}>{props.usersCount}</p>
        </div>
        <div className={s.usersWrap}>
          {props.users.map(u => (
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
      {props.currentPage !== props.usersPages ? (
        <div className={s.showMoreWrap}>
          <a
            href="#"
            className={`${s.btn_b} ${s.selected}`}
            onClick={e => {
              e.preventDefault();
              props.onPageChange(props.currentPage + 1);
            }}
          >
            Load more
          </a>
        </div>
      ) : (
        <p />
      )}
    </div>
  );
};

export default Users;
