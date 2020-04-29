import {createSelector} from "reselect";
import {AppStateType} from "../../redux/redux-store";

const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users;
};

export const getUsersAll = createSelector(getUsersSelector, (users) => {
    return users;
});

export const getUsersCount = (state: AppStateType) => {
    return state.usersPage.totalCount;
};

export const getUsersPerPage = (state: AppStateType) => {
    return state.usersPage.perPage;
};

export const getUsersPagesCount = (state: AppStateType) => {
    return Math.ceil(state.usersPage.totalCount / state.usersPage.perPage);
};

export const getCurrentUsersPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
};

export const getUsersIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching;
};

export const getUsersIsFollowing = (state: AppStateType) => {
    return state.usersPage.isFollowing;
};
