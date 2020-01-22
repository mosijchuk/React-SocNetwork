import React from "react";

import s from "./profileInfo.module.scss";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import userPhoto from "../../../assets/img/user.jpg";
import MaterialIcon from "material-icons-react";
import { Field, reduxForm } from "redux-form";
import profileAvatarFileInput from "../../common/Form/FormItems";

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
            {props.selfPage ? (
              <div className={s.avatarActions}>
                <UpdateAvatarReduxForm onChange={updateAvatar} />
              </div>
            ) : (
              ""
            )}
          </div>

          {!props.selfPage ? (
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
                  Follow {props.selfPage}
                </a>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className={s.profileInfo_wrap}>
          <h3>{props.profile.fullName}</h3>
          <ProfileStatus {...props} />

          <div className={s.profileInfo_wrap__items}>
            {props.profile.aboutMe ? (
              <div className={s.item}>
                <span>About me</span>
                <small>{props.profile.aboutMe}</small>
              </div>
            ) : (
              ""
            )}

            {props.profile.contacts.facebook ? (
              <div className={s.item}>
                <span>Facebook</span>
                <a href={props.profile.contacts.facebook}>
                  {props.profile.contacts.facebook}
                </a>
              </div>
            ) : (
              ""
            )}

            {props.profile.contacts.website ? (
              <div className={s.item}>
                <span>Website</span>
                <a href={props.profile.contacts.website} target="_blank">
                  {props.profile.contacts.website}
                </a>
              </div>
            ) : (
              ""
            )}

            {props.profile.contacts.vk ? (
              <div className={s.item}>
                <span>VK</span>
                <a href={props.profile.contacts.vk} target="_blank">
                  {props.profile.contacts.vk}
                </a>
              </div>
            ) : (
              ""
            )}

            {props.profile.contacts.twitter ? (
              <div className={s.item}>
                <span>Twitter</span>
                <a href={props.profile.contacts.twitter} target="_blank">
                  {props.profile.contacts.twitter}
                </a>
              </div>
            ) : (
              ""
            )}

            {props.profile.contacts.instagram ? (
              <div className={s.item}>
                <span>Instagram</span>
                <a href={props.profile.contacts.instagram} target="_blank">
                  {props.profile.contacts.instagram}{" "}
                </a>
              </div>
            ) : (
              ""
            )}

            {props.profile.contacts.youtube ? (
              <div className={s.item}>
                <span>Youtube</span>
                <a href={props.profile.contacts.youtube} target="_blank">
                  {props.profile.contacts.youtube}
                </a>
              </div>
            ) : (
              ""
            )}

            {props.profile.contacts.github ? (
              <div className={s.item}>
                <span>Github</span>
                <a href={props.profile.contacts.github} target="_blank">
                  {props.profile.contacts.github}
                </a>
              </div>
            ) : (
              ""
            )}

            {props.profile.contacts.mainLink ? (
              <div className={s.item}>
                <span>MainLink</span>
                <a href={props.profile.contacts.mainLink} target="_blank">
                  {props.profile.contacts.mainLink}{" "}
                </a>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
