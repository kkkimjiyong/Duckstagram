import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/config/configstore";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // 스토어 연결

  <Provider store={store}>
    <App />
  </Provider>
);

//잉 커밋메세지 사라진거 억울해서 주석쓰고 커밋하기 잉
