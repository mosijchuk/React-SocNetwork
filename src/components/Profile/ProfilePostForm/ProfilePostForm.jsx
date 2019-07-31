import React from "react";
import s from "./profilePostForm.module.scss";
import {
  addPostActionCreator,
  updateNewPostTextActionCreator
} from "../../../redux/state";

const ProfilePostForm = props => {
  let TextAreaPost = React.createRef();

  let AddPost = e => {
    e.preventDefault();
    props.dispatch(addPostActionCreator(TextAreaPost.current.value));
  };

  let NewPostText = () => {
    props.dispatch(updateNewPostTextActionCreator(TextAreaPost.current.value));
  };

  return (
    <div className={s.content}>
      <div className={s.contentArea}>
        <div className={s.contentArea_wrap}>
          <form onSubmit={AddPost}>
            <div className={s.form_group}>
              <textarea
                onChange={NewPostText}
                value={props.NewPostText}
                ref={TextAreaPost}
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
