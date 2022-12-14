import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";
import posts from "../modules/ListSlice";
import comments from "../modules/DetailSlice";
import login from "../modules/loginSlice";
import estar from "../modules/PostSlice";
/*reducer toolkit Slice.reducer
 */

// 내가 만든 리듀서를 넣어준다
const store = configureStore({
  reducer: {
    login: login,
    posts: posts,
    comments: comments,
    estar: estar,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
