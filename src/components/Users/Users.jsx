import React from "react";
import s from "./Users.module.scss";
import User from "./User";
import Preloader from "../common/Preloader/Preloader";

const Users = React.memo(props => {
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
          {props.isFetching ? (
            <Preloader inner={true} center={true} noBg={true} />
          ) : (
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
          )}
        </div>
      )}
    </div>
  );
});

export default Users;
