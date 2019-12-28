import { AuthAPI } from "./../API/api";

const SET_LOGIN_DATA = "SET_LOGIN_DATA";

let initialState = {
  userId: null,
  email: null,
  login: null,
  isLogged: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_DATA:
      return {
        ...state,
        ...action.data
      };
    default: {
      return state;
    }
  }
};

export let setAuthUserData = (userId, email, login, isLogged) => ({
  type: SET_LOGIN_DATA,
  data: { userId, email, login, isLogged }
});

//thunks
export let authMe = userId => dispatch => {
  AuthAPI.authMe().then(data => {
    if (data.resultCode === 0) {
      let { id, email, login } = data.data;
      let isLogged = true;
      dispatch(setAuthUserData(id, email, login, isLogged));
    } else {
      dispatch(setAuthUserData(false, false, false, false));
    }
  });
};

export default authReducer;
