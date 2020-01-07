import { AuthAPI } from "../API/api";
import { stopSubmit } from "redux-form";
import { authMe } from "./authReducer";

const SET_INITIALIZED = "SET_INITIALIZED";

let initialState = {
  initialized: false
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIALIZED:
      return {
        ...state,
        initialized: true
      };
    default: {
      return state;
    }
  }
};

export let initializeSuccess = () => ({
  type: SET_INITIALIZED
});

//thunks
export let initializeApp = () => dispatch => {
  let promise = dispatch(authMe());

  Promise.all([promise]).then(() => {
    dispatch(initializeSuccess());
  });
};
export default appReducer;
