import { ProfileAPI, UsersAPI } from "./../API/api";

const ADD_POST = "ADD-POST";
const DELETE_POST = "DELETE-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_PROFILE_STATUS = "SET_PROFILE_STATUS";
const PROFILE_LOADING = "PROFILE_LOADING";

let initialState = {
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
  ],
  profile: null,
  isFollowed: false,
  profileStatus: null,
  loading: true
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: state.posts.length + 1,
        name: "Jason Statham",
        date: "29 July 2019",
        message: action.text.post_text,
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

export let addPostAction = postText => ({
  type: ADD_POST,
  text: postText
});

export let setUserProfile = (profile, isFollowed) => ({
  type: SET_USER_PROFILE,
  profile: profile,
  isFollowed: isFollowed
});

export let setProfileStatus = status => ({
  type: SET_PROFILE_STATUS,
  status: status
});

export let deletePostAC = postId => ({
  type: DELETE_POST,
  postId: postId
});

export let toggleLoading = toggle => ({
  type: PROFILE_LOADING,
  loading: toggle
});

//thunks

export let setProfileData = (userId, isFollowed) => dispatch => {
  dispatch(toggleLoading(true));
  ProfileAPI.getProfileStatus(userId).then(data => {
    dispatch(setProfileStatus(data));

    ProfileAPI.getProfileInfo(userId).then(data => {
      dispatch(toggleLoading(false));
      dispatch(setUserProfile(data, isFollowed));
    });
  });
};

export let updateProfileStatus = status => dispatch => {
  dispatch(toggleLoading(true));
  ProfileAPI.updateProfileStatus(status).then(data => {
    dispatch(toggleLoading(false));
    dispatch(setProfileStatus(data));
  });
};

export let updateProfileAvatar = (formData, myId) => dispatch => {
  dispatch(toggleLoading(true));
  ProfileAPI.updateProfileAvatar(formData).then(data => {
    dispatch(toggleLoading(false));
    if (data.resultCode === 0) {
      dispatch(setProfileData(myId, false));
    }
  });
};

export let addPost = postText => dispatch => {
  dispatch(addPostAction(postText));
};

export let getFollowUser = userId => dispatch => {
  UsersAPI.getFollowUser(userId).then(followStatus => {
    dispatch(setProfileData(userId, followStatus));
  });
};

export let followProfile = userId => dispatch => {
  UsersAPI.followUser(userId).then(data => {
    if (data.resultCode === 0) {
      UsersAPI.getFollowUser(userId).then(followStatus => {
        dispatch(setProfileData(userId, followStatus));
      });
    }
  });
};

export let unfollowProfile = userId => dispatch => {
  UsersAPI.unfollowUser(userId).then(data => {
    if (data.resultCode === 0) {
      UsersAPI.getFollowUser(userId).then(followStatus => {
        dispatch(setProfileData(userId, followStatus));
      });
    }
  });
};

export default profileReducer;
