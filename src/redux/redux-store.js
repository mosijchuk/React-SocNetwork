import { createStore, combineReducers, applyMiddleware } from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import usersReducer from "./usersReducer";
import navbarReducer from "./navbarReducer";
import authReducer from "./authReducer";
import thunkMiddleWare from "redux-thunk";

let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  navbar: navbarReducer,
  usersPage: usersReducer,
  auth: authReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

window.store = store;
export default store;
