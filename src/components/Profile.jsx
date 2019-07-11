import React from "react";
import ProfilePost from "./ProfilePost";
import s from "./scss/profile.module.scss";

const Profile = () => {
  return (
    <div className={s.content}>
      <div className={s.contentArea}>
        <div className={s.content_head}>
          <img
            src="https://cdn-images-1.medium.com/max/2000/1*qXcjSfRj0C0ir2yMsYiRyw.jpeg"
            alt=""
          />
        </div>
        <div className={s.profileInfo}>
          <div className={s.profileInfo_avatar}>
            <img
              src="https://www.vokrug.tv/pic/person/6/7/5/b/675b60f5536dbbdb6493b6a442fd1286.jpg"
              alt=""
            />
          </div>
          <div className={s.profileInfo_wrap}>
            <h3>Jason Statham</h3>
            <div className={s.profileInfo_wrap__items}>
              <div className={s.item}>
                <span>Date of Birth:</span>
                <p>6 June 1993</p>
              </div>
              <div className={s.item}>
                <span>City:</span>
                <p>Kiyv</p>
              </div>
              <div className={s.item}>
                <span>Education:</span>
                <p>Harward</p>
              </div>
              <div className={s.item}>
                <span>Website:</span>
                <p>localhost:3000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={s.contentArea}>
        <div className={s.contentArea_wrap}>
          <form action="#">
            <div className={s.form_group}>
              <textarea
                name="post_text"
                id="postText"
                cols="30"
                rows="10"
                placeholder="Your news..."
                required
              />
            </div>
            <button type="submit" className={s.btn_b}>
              Post
            </button>
          </form>
        </div>
      </div>

      <ProfilePost />
      <ProfilePost />
      <ProfilePost />
    </div>
  );
};

export default Profile;
