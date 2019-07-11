import React from "react";
import MaterialIcon, { colorPalette } from "material-icons-react";
import s from "./profilePostForm.module.scss";

const ProfilePostForm = () => {
  return (
    <div className={s.content}>
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
    </div>
  );
};

export default ProfilePostForm;
