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
  },
  getProfileStatus(userId = 1) {
    return instance.get(`profile/status/${userId}`).then(response => {
      return response.data;
    });
  },
  updateProfileStatus(status) {
    return instance
      .put(`profile/status`, {
        status: status
      })
      .then(response => {
        if (response.data.resultCode === 0) {
          return status;
        }
      });
  },
  updateProfileAvatar(formData) {
    return instance
      .post(`profile/photo`, formData, {
        headers: {
          "Content-type": "multipart/form-data"
        }
      })
      .then(response => {
        return response.data;
      });
  }
};

export const AuthAPI = {
  authMe() {
    return instance.get(`auth/me`).then(response => {
      return response.data;
    });
  },
  login(email, password, rememberMe) {
    return instance
      .post(`auth/login`, { email, password, rememberMe })
      .then(response => {
        return response.data;
      });
  },
  logout() {
    return instance.delete(`auth/login`).then(response => {
      return response.data;
    });
  }
};
