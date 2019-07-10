import React from "react";
import MaterialIcon, { colorPalette } from "material-icons-react";

const ProfilePost = () => {
  return (
    <div className="contentArea">
      <div className="post-wrap">
        <div className="post-head">
          <a href="#" className="post-avatar">
            <img
              src="https://www.vokrug.tv/pic/person/6/7/5/b/675b60f5536dbbdb6493b6a442fd1286.jpg"
              alt=""
            />
          </a>
          <div className="post-owner">
            <a href="#">Jason Statham</a>
            <span className="post-date">8 July 2019</span>
          </div>
        </div>
        <div className="post-body">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos
            aliquid laborum quod at nemo facere sit praesentium esse earum
            eveniet rem quasi exercitationem labore accusamus ut neque
            laudantium, inventore porro.
          </p>
        </div>
        <div className="post-footer">
          <a href="#" className="like">
            <MaterialIcon icon="star_border" size={22} />
            <p>1</p>
          </a>
          <a href="#" className="repost">
            <MaterialIcon icon="reply" size={22} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfilePost;
