import React from "react";
import s from "./profile.module.scss";
import Profile from "./Profile";
import { connect } from "react-redux";
import { compose } from "redux";

import {
  setProfileData,
  getFollowUser,
  followProfile,
  unfollowProfile
} from "../../redux/profileReducer";
import { withRouter } from "react-router";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 10;
    }

    this.props.setProfileData(userId, this.props.isFollowed);
    this.props.getFollowUser(userId);
  }

  render() {
    return (
      <div className={s.content}> 
        <Profile
          {...this.props}
          followProfile={this.props.followProfile}
          unfollowProfile={this.props.unfollowProfile}
        />
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    profile: state.profilePage.profile,
    isFollowed: state.profilePage.isFollowed
  };
};

export default compose(
  connect(
    mapStateToProps,
    { setProfileData, getFollowUser, followProfile, unfollowProfile }
  ),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
