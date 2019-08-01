import React from "react";
import ProfilePostFormContainer from "./ProfilePostForm/ProfilePostFormContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import ProfilePost from "./ProfilePost/ProfilePost";
import s from "./profile.module.scss";

const Profile = props => {
  debugger;
  let posts = props.store
    .getState()
    .profilePage.posts.map(p => (
      <ProfilePost
        name={p.name}
        date={p.date}
        message={p.message}
        likes={p.likes}
      />
    ));

  return (
    <div className={s.content}>
      <ProfileInfo />
      <ProfilePostFormContainer store={props.store} />

      {posts}
    </div>
  );
};

export default Profile;
