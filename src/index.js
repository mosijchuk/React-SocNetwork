import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import store from "./redux/redux-store";
import { BrowserRouter } from "react-router-dom";

let rendererEntireTree = store => {
  ReactDOM.render(
    <BrowserRouter>
      <App store={store} />
    </BrowserRouter>,
    document.getElementById("root")
  );
};

rendererEntireTree(store);
store.subscribe(() => {
  rendererEntireTree(store);
});

serviceWorker.unregister();
