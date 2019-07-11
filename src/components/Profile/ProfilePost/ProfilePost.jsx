import React from "react";
import MaterialIcon, { colorPalette } from "material-icons-react";
import s from "./profilePost.module.scss";

const ProfilePost = () => {
  return (
    <div className={s.content}>
      <div className={s.contentArea}>
        <div className={s.post_wrap}>
          <div className={s.post_head}>
            <a href="#" className={s.post_avatar}>
              <img
                src="https://www.vokrug.tv/pic/person/6/7/5/b/675b60f5536dbbdb6493b6a442fd1286.jpg"
                alt=""
              />
            </a>
            <div className={s.post_owner}>
              <a href="#">Jason Statham</a>
              <span className={s.post_date}>8 July 2019</span>
            </div>
          </div>
          <div className={s.post_body}>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos
              aliquid laborum quod at nemo facere sit praesentium esse earum
              eveniet rem quasi exercitationem labore accusamus ut neque
              laudantium, inventore porro.
            </p>
          </div>
          <div className={s.post_footer}>
            <a href="#" className={s.like}>
              <MaterialIcon icon="star_border" size={22} />
              <p>1</p>
            </a>
            <a href="#" className={s.repost}>
              <MaterialIcon icon="reply" size={22} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePost;
