import React from "react";
import { createSelector } from "reselect";

const getUsersSelector = state => {
  return state.usersPage.users;
};

export const getUsersAll = createSelector(getUsersSelector, users => {
  return users;
});

export const getUsersCount = state => {
  return state.usersPage.totalCount;
};

export const getUsersPerPage = state => {
  return state.usersPage.perPage;
};

export const getUsersPagesCount = state => {
  return Math.ceil(state.usersPage.totalCount / state.usersPage.perPage);
};

export const getCurrentUsersPage = state => {
  return state.usersPage.currentPage;
};

export const getUsersIsFetching = state => {
  return state.usersPage.isFetching;
};

export const getUsersIsFollowing = state => {
  return state.usersPage.isFollowing;
};
