import React from "react";
import * as axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "6b0b3871-82c7-4380-a557-76c80e25c284"
  }
});

export const UsersAPI = {
  getUsers(count = 1, page = 1) {
    return instance.get(`users?count=${count}&page=${page}`).then(response => {
      return response.data;
    });
  },

  getFollowUser(userId = 1) {
    return instance.get(`follow/${userId}`).then(response => {
      return response.data;
    });
  },

  followUser(userId = 1) {
    return instance.post(`follow/${userId}`).then(response => {
      return response.data;
    });
  },
  unfollowUser(userId = 1) {
    return instance.delete(`follow/${userId}`).then(response => {
      return response.data;
    });
  }
};

export const ProfileAPI = {
  getProfileInfo(userId = 1) {
    return instance.get(`profile/${userId}`).then(response => {
      return response.data;
    });
  }
};

export const AuthAPI = {
  authMe() {
    return instance.get(`auth/me`).then(response => {
      return response.data;
    });
  }
};