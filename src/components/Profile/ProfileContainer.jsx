import React, { useState, useEffect } from "react";
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

const ProfileContainer = props => {
  const [userId, setUserId] = useState(props.match.params.userId || props.myId);
  const [loaded, setLoaded] = useState(false);
  const [selfPage, setSelfPage] = useState(true);

  const setProfileDataAfterReceiving = () => {
    if (userId && !loaded) {
      props.setProfileData(userId, props.isFollowed);
      props.getFollowUser(userId);
      setLoaded(true);
    }
  };

  useEffect(() => {
    setProfileDataAfterReceiving();
    setUserId(props.match.params.userId || props.myId);

    if (props.match.params.userId) {
      setSelfPage(false);
    }
  }, [props]);

  if (!loaded) {
    return <Preloader />;
  } else {
    return (
      <div className={s.content}>
        <Profile {...props} selfPage={selfPage} />
      </div>
    );
  }
};

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
