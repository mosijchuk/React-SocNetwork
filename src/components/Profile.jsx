import React from "react";
import ProfilePost from "./ProfilePost";

const Profile = () => {
  return (
    <div className="content">
      <div className="contentArea">
        <div className="content_head">
          <img
            src="https://cdn-images-1.medium.com/max/2000/1*qXcjSfRj0C0ir2yMsYiRyw.jpeg"
            alt=""
          />
        </div>
        <div className="profileInfo">
          <div className="profileInfo-avatar">
            <img
              src="https://www.vokrug.tv/pic/person/6/7/5/b/675b60f5536dbbdb6493b6a442fd1286.jpg"
              alt=""
            />
          </div>
          <div className="profileInfo-wrap">
            <h3>Jason Statham</h3>
            <div className="profileInfo-wrap__items">
              <div className="item">
                <span>Date of Birth:</span>
                <p>6 June 1993</p>
              </div>
              <div className="item">
                <span>City:</span>
                <p>Kiyv</p>
              </div>
              <div className="item">
                <span>Education:</span>
                <p>Harward</p>
              </div>
              <div className="item">
                <span>Website:</span>
                <p>localhost:3000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contentArea">
        <div className="contentArea-wrap">
          <form action="#">
            <div className="form-group">
              <textarea
                name="post_text"
                id="postText"
                cols="30"
                rows="10"
                placeholder="Your news..."
                required
              />
            </div>
            <button type="submit" className="btn-b">
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
