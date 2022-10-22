import { configureStore } from "@reduxjs/toolkit";
import estar from "../modules/estarSlice";

const store = configureStore({
  reducer: { estar: estar },
});

export default store;
