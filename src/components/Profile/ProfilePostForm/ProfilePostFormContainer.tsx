import React from "react";
import {connect} from "react-redux";
import {addPost} from "../../../redux/profileReducer";
import ProfilePostForm from "./ProfilePostForm";
import {AppStateType} from "../../../redux/redux-store";


type MapStatePropsType = {}

type MapDispatchPropsType = {
    addPost: (postText: { post_text: string }, formName: string) => void
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {};
};

const ProfilePostFormContainer = connect<MapStatePropsType, MapDispatchPropsType, unknown, AppStateType>(mapStateToProps, {addPost})(
    ProfilePostForm
);

export default ProfilePostFormContainer;
