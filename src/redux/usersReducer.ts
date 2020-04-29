import {GetUsersResponse, UsersAPI} from "../API/api";
import {UserType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";

let initialState = {
    users: [] as Array<UserType>,
    totalCount: 0 as number,
    perPage: 5 as number,
    currentPage: 1 as number,
    isFetching: true,
    isFollowing: false
};

type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW':
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
        case 'UNFOLLOW':
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
        case 'SET_USERS':
            return {
                ...state,
                users: [...state.users, ...action.users]
            };
        case 'SET_CURRENT_USERS_PAGE':
            return {
                ...state,
                currentPage: action.page_number
            };
        case 'SET_TOTAL_COUNT':
            return {
                ...state,
                totalCount: action.count
            };
        case 'TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            };
        case "TOGGLE_IS_FOLLOWING":
            return {
                ...state,
                isFollowing: action.isFollowing
            };
        default: {
            return state;
        }
    }
};


//actions
type ActionsType = InferActionsTypes<typeof actions>

export const actions = {
    followSuccess: (userId: number) => ({
        type: 'FOLLOW',
        userId
    } as const),
    unfollowSuccess: (userId: number) => ({
        type: 'UNFOLLOW',
        userId
    } as const),
    setUsers: (users: Array<UserType>) => ({
        type: 'SET_USERS',
        users
    } as const),
    setCurrentPage: (page_number: number) => ({
        type: 'SET_CURRENT_USERS_PAGE',
        page_number
    } as const),
    setTotalCount: (count: number) => ({
        type: 'SET_TOTAL_COUNT',
        count
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({
        type: 'TOGGLE_IS_FETCHING',
        isFetching
    } as const),
    toggleIsFollowing: (isFollowing: boolean) => ({
        type: 'TOGGLE_IS_FOLLOWING',
        isFollowing
    } as const),
}
//thunks
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const getUsers = (perPage: number, page: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(page));

        const data: GetUsersResponse = await UsersAPI.getUsers(perPage, page)
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalCount(data.totalCount))
    };
};
export const follow = (userid: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFollowing(true));

        const data = await UsersAPI.followUser(userid)
        if (data.resultCode === 0) {
            dispatch(actions.followSuccess(userid))
        }
        dispatch(actions.toggleIsFollowing(false))
    };
};
export const unfollow = (userid: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFollowing(true));

        const data = await UsersAPI.unfollowUser(userid)
        if (data.resultCode === 0) {
            dispatch(actions.unfollowSuccess(userid));
        }
        dispatch(actions.toggleIsFollowing(false));
    };
};

export default usersReducer;