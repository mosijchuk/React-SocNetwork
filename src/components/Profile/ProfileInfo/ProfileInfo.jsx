import React from "react";

import s from "./profileInfo.module.scss";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import userPhoto from "../../../assets/img/user.jpg";
import MaterialIcon from "material-icons-react";
import { Field, reduxForm } from "redux-form";
import profileAvatarFileInput from "../../common/Form/FormItems";
import ProfileData from "./ProfileData";

const UpdateAvatarForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field type="file" name="image" component={profileAvatarFileInput} />
    </form>
  );
};

const UpdateAvatarReduxForm = reduxForm({ form: "avatarUpdate" })(
  UpdateAvatarForm
);

const ProfileInfo = props => {
  if (!props.profile || props.loading) {
    return <Preloader />;
  }

  let updateAvatar = imageData => {
    let formData = new FormData();
    formData.append("image", imageData.image);

    for (var key of formData.entries()) {
    }
    props.updateProfileAvatar(formData, props.myId);
  };

  let changeAvatarClick = e => {
    e.preventDefault();
  };

  return (
    <div className={s.contentArea}>
      <div className={s.profileInfo}>
        <div className={s.profileInfo_avatar}>
          <div className={s.profileInfo_avatar_wrap}>
            <img
              src={
                props.profile.photos.large != null
                  ? props.profile.photos.large
                  : userPhoto
              }
              alt=""
            />
            {props.isOwner && (
              <div className={s.avatarActions}>
                <UpdateAvatarReduxForm onChange={updateAvatar} />
              </div>
            )}
          </div>

          {!props.isOwner && (
            <div className={s.profileInfo_avatar_buttonsWrap}>
              {props.isFollowed ? (
                <a
                  href="#"
                  className={`${s.btn_b} ${s.selected}`}
                  onClick={e => {
                    e.preventDefault();
                    props.unfollowProfile(props.profile.userId);
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
                    props.followProfile(props.profile.userId);
                  }}
                >
                  Follow {props.isOwner}
                </a>
              )}
            </div>
          )}
        </div>
        <div className={s.profileInfo_wrap}>
          <h3>{props.profile.fullName}</h3>
          <ProfileStatus {...props} />

          <ProfileData {...props} />
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
