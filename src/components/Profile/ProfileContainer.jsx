import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import {
  followProfile,
  setProfileData,
  unfollowProfile,
  updateProfileAvatar,
  updateProfileStatus,
  getFollowUser
} from "../../redux/profileReducer";
import Preloader from "../common/Preloader/Preloader";
import Profile from "./Profile";
import s from "./profile.module.scss";

class ProfileContainer extends React.Component {
  selfPage = true;

  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.match.params.userId || this.props.myId,
      loaded: false
    };
  }

  setProfileDataAfterReceiving = () => {
    if (this.state.userId && !this.state.loaded) {
      this.props.setProfileData(this.state.userId, this.props.isFollowed);
      this.props.getFollowUser(this.state.userId);
      this.setState({
        loaded: true
      });
    }
  };

  componentDidMount() {
    this.setProfileDataAfterReceiving();
  }

  componentDidUpdate(prevProps, prevState) {
    this.setProfileDataAfterReceiving();

    if (prevProps.myId !== this.props.myId) {
      this.setState({
        userId: this.props.match.params.userId || this.props.myId,
        loaded: false
      });
    }
    if (this.props.match.params.userId) {
      this.selfPage = false;
    }
  }

  render() {
    if (!this.state.loaded) {
      return <Preloader />;
    } else {
      return (
        <div className={s.content}>
          <Profile {...this.props} selfPage={this.selfPage} />
        </div>
      );
    }
  }
}

let mapStateToProps = state => {
  return {
    profile: state.profilePage.profile,
    isFollowed: state.profilePage.isFollowed,
    myId: state.auth.userId,
    profileStatus: state.profilePage.profileStatus,
    loading: state.profilePage.loading
  };
};

export default compose(
  connect(mapStateToProps, {
    setProfileData,
    getFollowUser,
    followProfile,
    unfollowProfile,
    updateProfileStatus,
    updateProfileAvatar
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
