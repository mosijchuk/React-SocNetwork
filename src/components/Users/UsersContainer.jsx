import React from "react";
import { connect } from "react-redux";
import Users from "./Users";
import { followAC, unFollowAC, setUsersAC } from "../../redux/usersReducer";

let mapStateToProps = state => {
  return {
    users: state.usersPage.users,
    usersCount: state.usersPage.users.length
  };
};

let mapDispatchToProps = dispatch => {
  return {
    follow: userId => {
      dispatch(followAC(userId));
    },
    unfollow: userId => {
      dispatch(unFollowAC(userId));
    },
    setUsers: users => {
      dispatch(setUsersAC(users));
    }
  };
};

const UsersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);

export default UsersContainer;
