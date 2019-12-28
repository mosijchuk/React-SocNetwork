import React from "react";
import s from "./profileInfo.module.scss";
import Preloader from "../../common/Preloader/Preloader";
import { UsersAPI } from "../../../API/api";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = props => {
  if (!props.profile) {
    return <Preloader />;
  }
  return (
    <div className={s.contentArea}>
      {/* <div className={s.content_head}>
        <img
          src="https://cdn-images-1.medium.com/max/2000/1*qXcjSfRj0C0ir2yMsYiRyw.jpeg"
          alt=""
        />
      </div> */}
      <div className={s.profileInfo}>
        <div className={s.profileInfo_avatar}>
          <img src={props.profile.photos.large} alt="" />
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
              Follow
            </a>
          )}
        </div>
        <div className={s.profileInfo_wrap}>
          <h3>{props.profile.fullName}</h3>
          <ProfileStatus {...props} />
          <div className={s.profileInfo_wrap__items}>
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
