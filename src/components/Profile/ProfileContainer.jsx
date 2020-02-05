import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import {
  followProfile,
  setProfileData,
  setProfileStatus,
  unfollowProfile,
  updateProfileAvatar,
  updateProfileData,
  updateProfileStatus,
  getFollowUser
} from "../../redux/profileReducer";
import Preloader from "../common/Preloader/Preloader";
import Profile from "./Profile";
import s from "./profile.module.scss";

const ProfileContainer = props => {
  const [userId, setUserId] = useState(props.match.params.userId || props.myId);
  const [loaded, setLoaded] = useState(false);
  const [isOwner, setOwner] = useState(false);

  const setProfileDataFlow = () => {
    if (userId) {
      props.setProfileData(userId, props.isFollowed);
      props.setProfileStatus(userId);
      props.getFollowUser(userId);

      if (userId === props.myId) {
        setOwner(true);
      }
      setLoaded(true);
    }
  };

  useEffect(() => {
    if (!loaded) {
      setProfileDataFlow();
    }
    setUserId(props.match.params.userId || props.myId);
  }, [props]);

  useEffect(() => {
    if (loaded) {
      setProfileDataFlow();
    }
  }, [userId]);

  if (!loaded) {
    return <Preloader />;
  } else {
    return (
      <div className={s.content}>
        <Profile {...props} isOwner={isOwner} />
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
    setProfileStatus,
    getFollowUser,
    followProfile,
    unfollowProfile,
    updateProfileStatus,
    updateProfileData,
    updateProfileAvatar
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
