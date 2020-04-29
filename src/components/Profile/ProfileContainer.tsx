import React, {FC, useEffect, useState} from "react";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {
    followProfile,
    getFollowUser,
    setProfileData,
    setProfileStatus,
    unfollowProfile,
    updateProfileAvatar,
    updateProfileData,
    updateProfileStatus
} from "../../redux/profileReducer";
import Preloader from "../common/Preloader/Preloader";
import Profile from "./Profile";
import s from "./profile.module.scss";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../types/types";

interface MatchParams {
    userId?: string;
}

type MapStatePropsType = {
    profile: ProfileType | null
    isFollowed: boolean
    myId: number | null
    profileStatus: string | null
    loading: boolean
}
type MapDispatchPropsType = {
    setProfileData: (userId: number, isFollowed: boolean) => void
    setProfileStatus: (userId: number) => void
    getFollowUser: (userId: number) => void
    followProfile: (userId: number) => void
    unfollowProfile: (userId: number) => void
    updateProfileStatus: (status: string) => void
    updateProfileData: (formData: any) => void
    updateProfileAvatar: (formData: any) => void
}
type OwnPropsType = {}


type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType & RouteComponentProps<MatchParams>

const ProfileContainer: FC<PropsType> = props => {
    const [userId, setUserId] = useState(Number(props.match.params.userId) || props.myId);
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

        setUserId(Number(props.match.params.userId) || props.myId);
    }, [props]);

    useEffect(() => {
        if (loaded) {
            setProfileDataFlow();
        }
    }, [userId]);

    if (!loaded) {
        return <Preloader/>;
    } else {
        return (
            <div className={s.content}>
                <Profile {...props} isOwner={isOwner}/>
            </div>
        );
    }
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profile: state.profilePage.profile,
        isFollowed: state.profilePage.isFollowed,
        myId: state.auth.userId,
        profileStatus: state.profilePage.profileStatus,
        loading: state.profilePage.loading
    };
};


export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
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
