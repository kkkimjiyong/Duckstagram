import { configureStore } from "@reduxjs/toolkit";
import estar from "../modules/PostSlice";

const store = configureStore({
  reducer: { estar: estar },
});

export default store;
