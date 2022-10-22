// src/redux/modules/config/configStore.js

import { configureStore } from "@reduxjs/toolkit";
import login from "../modules/loginSlice";

const store = configureStore({
  reducer: { login: login },
});

export default store;
