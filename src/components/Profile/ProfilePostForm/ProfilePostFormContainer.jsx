import React from "react";
import { connect } from "react-redux";
import { addPost } from "../../../redux/profileReducer";
import ProfilePostForm from "./ProfilePostForm";

let mapStateToProps = state => {
  return {};
};

let mapDispatchToProps = dispatch => {
  return {};
};

const ProfilePostFormContainer = connect(mapStateToProps, { addPost })(
  ProfilePostForm
);

export default ProfilePostFormContainer;
