import React from "react";
import { connect } from "react-redux";
import {
  addPostActionCreator,
  updateNewPostTextActionCreator
} from "../../../redux/profileReducer";
import ProfilePostForm from "./ProfilePostForm";

let mapStateToProps = state => {
  return {
    NewPostText: state.profilePage.newPostText
  };
};

let mapDispatchToProps = dispatch => {
  return {
    addPost: () => {
      dispatch(addPostActionCreator());
    },
    updateText: text => {
      dispatch(updateNewPostTextActionCreator(text));
    }
  };
};

const ProfilePostFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePostForm);

export default ProfilePostFormContainer;
