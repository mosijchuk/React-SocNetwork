import React from "react";
import {connect} from "react-redux";
import ProfilePosts from "./ProfilePosts";
import {deletePost} from "../../redux/profileReducer";
import {AppStateType} from "../../redux/redux-store";
import {PostType} from "../../types/types";


type MapStatePropsType = {
    posts: Array<PostType>
}
type MapDispatchPropsType = {
    deletePost: (postId: number) => void
}
type OwnPropsType = {}


const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        posts: state.profilePage.posts
    };
};

const ProfilePostsContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
    mapStateToProps,
    {deletePost}
)(ProfilePosts);

export default ProfilePostsContainer;
