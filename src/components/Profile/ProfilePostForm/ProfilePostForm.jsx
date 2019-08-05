import React from "react";
import s from "./profilePostForm.module.scss";

const ProfilePostForm = props => {
  let AddPost = e => {
    e.preventDefault();
    props.addPost();
  };

  let NewPostText = e => {
    props.updateText(e.target.value);
  };

  return (
    <div className={s.content}>
      <div className={s.contentArea}>
        <div className={s.contentArea_wrap}>
          <form onSubmit={AddPost}>
            <div className={s.form_group}>
              <textarea
                onChange={NewPostText}
                onKeyDown={event => {
                  if (event.keyCode === 13) {
                    AddPost(event);
                  }
                }}
                value={props.NewPostText}
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
    </div>
  );
};

export default ProfilePostForm;
