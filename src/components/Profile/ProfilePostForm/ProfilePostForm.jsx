import React from "react";
import s from "./profilePostForm.module.scss";
import { Field, reduxForm } from "redux-form";
import { Textarea } from "../../common/Form/FormItems";
import { required, maxLengthCreator } from "../../common/Form/validators";

const maxLength150 = maxLengthCreator(150);

const PostForm = props => {
  return (
    <form
      onSubmit={props.handleSubmit}
      onKeyDown={event => {
        if (event.keyCode === 13) {
          event.preventDefault();
          props.handleSubmit();
        }
      }}
    >
      <Field
        component={Textarea}
        name={"post_text"}
        placeholder={"Your news..."}
        cols={"30"}
        rows={"10"}
        validate={[required, maxLength150]}
      />
      <button type="submit" className={s.btn_b}>
        Post
      </button>
    </form>
  );
};

let formName = "profilePost";

let ProfilePostReduxForm = reduxForm({
  form: formName
})(PostForm);

const ProfilePostForm = props => {
  let onSubmit = postText => {
    props.addPost(postText, formName);
  };

  return (
    <div className={s.content}>
      <div className={s.contentArea}>
        <div className={s.contentArea_wrap}>
          <ProfilePostReduxForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePostForm;
