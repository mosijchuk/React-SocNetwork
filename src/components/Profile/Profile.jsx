import React from "react";
import ProfilePost from "./ProfilePost/ProfilePost";
import ProfilePostForm from "./ProfilePostForm/ProfilePostForm";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import s from "./profile.module.scss";

const Profile = props => {
  let posts = props.state.posts.map(p => (
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
      <ProfilePostForm
        NewPostText={props.state.newPostText}
        dispatch={props.dispatch}
      />

      {posts}
    </div>
  );
};

export default Profile;
