import React from "react";
import {
  addPostActionCreator,
  updateNewPostTextActionCreator
} from "../../../redux/profileReducer";
import ProfilePostForm from "./ProfilePostForm";

const ProfilePostFormContainer = props => {
  let store = props.store;
  let state = store.getState().profilePage;

  let AddPost = () => {
    store.dispatch(addPostActionCreator());
  };

  let NewPostText = text => {
    debugger;
    store.dispatch(updateNewPostTextActionCreator(text));
  };

  return (
    <ProfilePostForm
      addPost={AddPost}
      updateText={NewPostText}
      NewPostText={state.newPostText}
    />
  );
};

export default ProfilePostFormContainer;
