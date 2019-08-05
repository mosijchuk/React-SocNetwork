import React from "react";
import { connect } from "react-redux";
import ProfilePosts from "./ProfilePosts";
import { deletePostAC } from "../../redux/profileReducer";

let mapStateToProps = state => {
  return {
    posts: state.profilePage.posts
  };
};

let mapDispatchToProps = dispatch => {
  return {
    deletePost: postId => dispatch(deletePostAC(postId))
  };
};
const ProfilePostsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePosts);

export default ProfilePostsContainer;
