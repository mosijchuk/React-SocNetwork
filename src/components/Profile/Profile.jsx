import React from "react";
import ProfilePostFormContainer from "./ProfilePostForm/ProfilePostFormContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import ProfilePost from "./ProfilePost/ProfilePost";
import s from "./profile.module.scss";
import ProfilePostsContainer from "./ProfilePostsContainer";

const Profile = props => {
  return (
    <div className={s.content}>
      <ProfileInfo />
      <ProfilePostFormContainer />
      <ProfilePostsContainer />
    </div>
  );
};

export default Profile;
