import { AuthAPI, SecurityAPI } from "./../API/api";
import { stopSubmit } from "redux-form";

const SET_LOGIN_DATA = "SET_LOGIN_DATA";
const SET_CAPTCHA_URL = "SET_CAPTCHA_URL";

let initialState = {
  userId: null,
  email: null,
  login: null,
  isLogged: false,
  captchaUrl: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_DATA:
    case SET_CAPTCHA_URL:
      return {
        ...state,
        ...action.payload
      };
    default: {
      return state;
    }
  }
};

export let setAuthUserData = (userId, email, login, isLogged) => ({
  type: SET_LOGIN_DATA,
  payload: { userId, email, login, isLogged, captchaUrl: null }
});

export let setCaptchaUrl = captchaUrl => ({
  type: SET_CAPTCHA_URL,
  payload: { captchaUrl }
});

//thunks
export let authMe = userId => dispatch => {
  return AuthAPI.authMe().then(data => {
    if (data.resultCode === 0) {
      let { id, email, login } = data.data;
      let isLogged = true;
      dispatch(setAuthUserData(id, email, login, isLogged));
    } else {
      dispatch(setAuthUserData(false, false, false, false));
    }
  });
};

export let getCaptchaUrl = () => dispatch => {
  return SecurityAPI.getCaptcha().then(data => {
    dispatch(setCaptchaUrl(data.data.url));
  });
};

export let loginMe = (email, password, rememberMe, captcha) => dispatch => {
  AuthAPI.login(email, password, rememberMe, captcha).then(data => {
    if (data.resultCode === 0) {
      dispatch(authMe(data.userId));
      console.log("ID: " + data.userId);
    } else {
      if (data.resultCode === 10) {
        dispatch(getCaptchaUrl());
      }
      dispatch(stopSubmit("login", { _error: data.messages[0] }));
    }
  });
};

export let logoutMe = () => dispatch => {
  AuthAPI.logout().then(data => {
    if (data.resultCode === 0) {
      dispatch(setAuthUserData(false, false, false, false));
    }
  });
};

export default authReducer;
