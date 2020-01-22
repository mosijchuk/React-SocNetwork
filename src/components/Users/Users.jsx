import React from "react";
import s from "./Users.module.scss";
import User from "./User";

const Users = React.memo(props => {
  let ffWew = () => {
    console.log("loaded");
  };

  return (
    <div className={s.content}>
      <div className={s.contentArea}>
        <div className={s.sectionHeader}>
          <h2>Users</h2>
          <p className={s.secondary}>{props.usersCount}</p>
        </div>
        <div className={s.usersWrap}>
          {props.users.map(u => (
            <User
              u={u}
              follow={props.follow}
              unfollow={props.unfollow}
              props={props}
              key={u.id}
            />
          ))}
        </div>
      </div>

      {props.currentPage !== props.usersPages && (
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
      )}
    </div>
  );
});

export default Users;
