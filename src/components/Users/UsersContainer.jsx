import React from "react";
import { connect } from "react-redux";
import Users from "./Users";
import {
  follow,
  unfollow,
  setUsers,
  setCurrentPage,
  setTotalCount,
  getUsers
} from "../../redux/usersReducer";
import Preloader from "../common/Preloader/Preloader";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import {
  getUsersAll,
  getUsersCount,
  getUsersPerPage,
  getUsersPagesCount,
  getCurrentUsersPage,
  getUsersIsFetching
} from "./users-selectors";

class UsersContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.users.length === 0) {
      this.props.getUsers(this.props.perPage, 1);
    }
  }
  onPageChange = page => {
    this.props.getUsers(this.props.perPage, page);
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : ""}
        <Users
          users={this.props.users}
          usersCount={this.props.usersCount}
          currentPage={this.props.currentPage}
          usersPages={this.props.usersPages}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          onPageChange={this.onPageChange}
          toggleIsFetching={this.props.toggleIsFetching}
        />
      </>
    );
  }
}

let mapStateToProps = state => {
  return {
    users: getUsersAll(state),
    usersCount: getUsersCount(state),
    perPage: getUsersPerPage(state),
    usersPages: getUsersPagesCount(state),
    currentPage: getCurrentUsersPage(state),
    isFetching: getUsersIsFetching(state)
  };
};

export default compose(
  connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalCount,
    getUsers
  }),
  withAuthRedirect
)(UsersContainer);
