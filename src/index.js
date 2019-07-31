import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import store from "./redux/state";
import { BrowserRouter } from "react-router-dom";

let rendererEntireTree = state => {
  ReactDOM.render(
    <BrowserRouter>
      <App store={store} />
    </BrowserRouter>,
    document.getElementById("root")
  );
};

rendererEntireTree(store.getState());
store.subscribe(rendererEntireTree);

serviceWorker.unregister();
