import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/config/configStore";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // 스토어 연결
  <Provider store={store}>
    <App />
  </Provider>
);
