import React from "react";
import MaterialIcon, { colorPalette } from "material-icons-react";
import s from "./profilePost.module.scss";

const ProfilePost = (props) => {
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
              <a href="#">{props.name}</a>
              <span className={s.post_date}>{props.date}</span>
            </div>
          </div>
          <div className={s.post_body}>
            <p>
            {props.message}
            </p> 
          </div>
          <div className={s.post_footer}>
            <a href="#" className={s.like}>
              <MaterialIcon icon="star_border" size={22} />
              <p>{props.likes}</p>
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
