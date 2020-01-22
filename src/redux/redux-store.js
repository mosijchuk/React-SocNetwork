import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import usersReducer from "./usersReducer";
import navbarReducer from "./navbarReducer";
import authReducer from "./authReducer";
import thunkMiddleWare from "redux-thunk";
import {
  reducer as formReducer
} from "redux-form";
import appReducer from "./appReducer";

let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  navbar: navbarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWare)));
// let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

window.store = store;
export default store;