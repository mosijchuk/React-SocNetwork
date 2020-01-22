import {
  UsersAPI
} from "../API/api";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_USERS_PAGE = "SET_CURRENT_USERS_PAGE";
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

let initialState = {
  users: [],
  totalCount: 0,
  perPage: 5,
  currentPage: 1,
  isFetching: true
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userId) {
            return {
              ...u,
              followed: true
            };
          }
          return u;
        })
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userId) {
            return {
              ...u,
              followed: false
            };
          }
          return u;
        })
      };
    case SET_USERS:
      return {
        ...state,
        users: [...state.users, ...action.users]
      };
    case SET_CURRENT_USERS_PAGE:
      return {
        ...state,
        currentPage: action.page_number
      };
    case SET_TOTAL_COUNT:
      return {
        ...state,
        totalCount: action.count
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching
      };
    default: {
      return state;
    }
  }
};

export let followSuccess = userId => ({
  type: FOLLOW,
  userId
});
export let unfollowSuccess = userId => ({
  type: UNFOLLOW,
  userId
});
export let setUsers = users => ({
  type: SET_USERS,
  users
});
export let setCurrentPage = page_number => ({
  type: SET_CURRENT_USERS_PAGE,
  page_number
});
export let setTotalCount = count => ({
  type: SET_TOTAL_COUNT,
  count
});
export let toggleIsFetching = isFetching => ({
  type: TOGGLE_IS_FETCHING,
  isFetching
});

//thunks
export const getUsers = (perPage, page) => {
  return dispatch => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page));

    UsersAPI.getUsers(perPage, page).then(data => {
      dispatch(toggleIsFetching(false));
      dispatch(setUsers(data.items));
      dispatch(setTotalCount(data.totalCount));
    });
  };
};

export const follow = userid => {
  return dispatch => {
    dispatch(toggleIsFetching(true));

    UsersAPI.followUser(userid).then(data => {
      if (data.resultCode === 0) {
        dispatch(followSuccess(userid));
      }
      dispatch(toggleIsFetching(false));
    });
  };
};

export const unfollow = userid => {
  return dispatch => {
    dispatch(toggleIsFetching(true));

    UsersAPI.unfollowUser(userid).then(data => {
      if (data.resultCode === 0) {
        dispatch(unfollowSuccess(userid));
      }
      dispatch(toggleIsFetching(false));
    });
  };
};

export default usersReducer;