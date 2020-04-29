import {ProfileAPI, UsersAPI} from "../API/api";
import {reset, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const ADD_POST = "ADD-POST";
const DELETE_POST = "DELETE-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_PROFILE_STATUS = "SET_PROFILE_STATUS";
const SET_PROFILE_AVATAR = "SET_PROFILE_AVATAR";
const PROFILE_LOADING = "PROFILE_LOADING";


const initialState = {
    posts: [
        {
            id: 1,
            name: "Jason Statham",
            date: "8 July 2019",
            message:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis rem nostrum ea magni numquam, autem dignissimos pariatur? Dolores culpa, porro, vel molestiae ea repellendus obcaecati necessitatibus tempore, ab asperiores nulla.",
            likes: 7
        },
        {
            id: 2,
            name: "Jason Statham",
            date: "7 July 2019",
            message:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis rem nostrum ea magni numquam, autem dignissimos pariatur? Dolores culpa, porro, vel molestiae ea repellendus obcaecati necessitatibus tempore, ab asperiores nulla.",
            likes: 42
        },
        {
            id: 3,
            name: "Jason Statham",
            date: "6 July 2019",
            message:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis rem nostrum ea magni numquam, autem dignissimos pariatur? Dolores culpa, porro, vel molestiae ea repellendus obcaecati necessitatibus tempore, ab asperiores nulla.",
            likes: 54
        }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    isFollowed: false,
    profileStatus: null as string | null,
    loading: true
};

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: state.posts.length + 1,
                name: "Jason Statham",
                date: "29 July 2019",
                message: action.text,
                likes: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            };
        }

        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter(p => {
                    return p.id !== action.postId;
                })
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile,
                isFollowed: action.isFollowed
            };
        }
        case SET_PROFILE_STATUS: {
            return {
                ...state,
                profileStatus: action.status
            };
        }
        case SET_PROFILE_AVATAR: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            };
        }
        case PROFILE_LOADING: {
            return {
                ...state,
                loading: action.loading
            };
        }
        default: {
            return state;
        }
    }
};

type ActionTypes = AddPostActionType |
    SetUserProfileActionType |
    SetProfileStatusActionType |
    SetProfileAvatarActionType |
    DeletePostActionType |
    ToggleLoadingActionType


type AddPostActionType = {
    type: typeof ADD_POST
    text: string
}
export const addPostAction = (text: string): AddPostActionType => ({
    type: ADD_POST,
    text
});

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
    isFollowed: boolean

}
export const setUserProfile = (profile: ProfileType, isFollowed: boolean): SetUserProfileActionType => ({
    type: SET_USER_PROFILE,
    profile,
    isFollowed
});

type SetProfileStatusActionType = {
    type: typeof SET_PROFILE_STATUS
    status: string
}
export const setProfileStatusAC = (status: string): SetProfileStatusActionType => ({
    type: SET_PROFILE_STATUS,
    status
});

type SetProfileAvatarActionType = {
    type: typeof SET_PROFILE_AVATAR
    photos: PhotosType
}
export const setProfileAvatar = (photos: PhotosType): SetProfileAvatarActionType => ({
    type: SET_PROFILE_AVATAR,
    photos
});

type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePostAC = (postId: number): DeletePostActionType => ({
    type: DELETE_POST,
    postId
});

type ToggleLoadingActionType = {
    type: typeof PROFILE_LOADING
    loading: boolean
}
export const toggleLoading = (loading: boolean): ToggleLoadingActionType => ({
    type: PROFILE_LOADING,
    loading
});

//thunks

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>
export const setProfileStatus = (userId: number): ThunkType => async (dispatch) => {
    ProfileAPI.getProfileStatus(userId).then((data: any) => {
        dispatch(setProfileStatusAC(data));
    });
};

export const setProfileData = (userId: number, isFollowed: boolean): ThunkType => async (dispatch) => {
    dispatch(toggleLoading(true));

    ProfileAPI.getProfileInfo(userId).then((data: any) => {
        dispatch(setUserProfile(data, isFollowed));
        dispatch(toggleLoading(false));
    });
};

export const updateProfileStatus = (status: string): ThunkType => async (dispatch) => {
    dispatch(toggleLoading(true));
    ProfileAPI.updateProfileStatus(status).then((data: any) => {
        dispatch(toggleLoading(false));
        dispatch(setProfileStatusAC(data));
    });
};

export const updateProfileData = (formData: any): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const isFollowed = getState().profilePage.isFollowed;

    ProfileAPI.updateProfileData(formData).then((data: any) => {
        if (data.resultCode === 0 && userId) {
            dispatch(setProfileData(userId, isFollowed));
        } else {
            // @ts-ignore
            dispatch(stopSubmit("profileEdit", {_error: data.messages[0] || 'Error'}));
        }
    });
};

export const updateProfileAvatar = (formData: any): ThunkType => async (dispatch) => {

    dispatch(toggleLoading(true));
    const res = await ProfileAPI.updateProfileAvatar(formData)
    if (res.resultCode === 0) {
        dispatch(setProfileAvatar(res.data.photos));
    }
    dispatch(toggleLoading(false));
};


export const addPost = (postText: { post_text: string }, formName: string): ThunkType => async (dispatch) => {
    dispatch(addPostAction(postText.post_text));
    // @ts-ignore
    dispatch(reset(formName));
};

export const getFollowUser = (userId: number): ThunkType => async (dispatch) => {
    const followStatus = await UsersAPI.getFollowUser(userId)
    dispatch(setProfileData(userId, followStatus))
};

export const followProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await UsersAPI.followUser(userId);
    if (data.resultCode === 0) {
        let followStatus = await UsersAPI.getFollowUser(userId);
        dispatch(setProfileData(userId, followStatus));
    }
};

export const unfollowProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await UsersAPI.unfollowUser(userId);
    if (data.resultCode === 0) {
        let followStatus = await UsersAPI.getFollowUser(userId);
        dispatch(setProfileData(userId, followStatus));
    }
};

export const deletePost = (postId: number): ThunkType => async (dispatch) => {
    dispatch(deletePostAC(postId))
}

export default profileReducer;
