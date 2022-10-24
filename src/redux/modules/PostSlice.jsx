import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { postApi } from "../../mytools/instance";

const initialState = {
  posts: [
    {
      postId: 1,
      title: "",
      images: "",
      content: "",
      like: "",
      dislike: "",
    },
  ],

  isLoading: false,
  error: null,
};

//post promise
export const __addEstar = createAsyncThunk(
  "estar",
  async (payload, thunkAPI) => {
    try {
      const { data } = await postApi.postPost(payload);
      console.log(data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 게시물 삭제 DELET
export const __deleteEstar = createAsyncThunk(
  "estar/deleteestar",
  async (payload, thunkAPI) => {
    try {
      const { data } = await postApi.deletePost(payload);
      console.log(data);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 게시물 수정 patch
export const __updateEstar = createAsyncThunk(
  "estar/updateeestar",
  async (payload, thunkAPI) => {
    try {
      const { newContent, postID } = payload;
      await postApi.patchPost(postID, newContent); // 서버한테 보낸상태
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const estarSlice = createSlice({
  name: "estar",
  initialState,
  reducers: {},
  extraReducers: {
    //post
    [__addEstar.pending]: (state) => {
      state.isLoading = true;
    },
    [__addEstar.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts.push(action.payload);
      console.log("fulfilled 상태", state, action);
    },
    [__addEstar.rejected]: (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      state.error = "아아";
    },
    // 게시물 delete
    [__deleteEstar.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteEstar.fulfilled]: (state, action) => {
      state.isLoading = false;
      let delpost = state.posts.filter((post) => action.payload !== post.id);
      state.posts = delpost;
      alert("삭제 완료 되었습니다.");
      window.location.replace("/estarlist");
    },
    [__deleteEstar.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // PATCH 게시물별 댓글!!! 게시물별 댓글 수정하기!!!
    [__deleteEstar.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteEstar.fulfilled]: (state, action) => {
      let newNewContent = state.posts.map((post) => {
        if (post.id !== action.payload.postID) {
          return post;
        } else {
          return { ...post, content: action.payload.newContent };
        }
      });
      state.post = newNewContent;
      state.isLoading = false;
    },
    [__deleteEstar.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {} = estarSlice.actions;
export default estarSlice.reducer;

/* import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";


const actions = {
    CREATE_MEMO: 'CREATE_MEMO',
}

export const writeMemo = (data) => {
  return async (dispatch) => {
    try {
      const response = await ssoInstance.post("api/memo/create", data);
      dispatch({
        type: actions.CREATE_MEMO,
        payload: response,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  };
};


export default actions;

export default matjipSlice.reducer; */

//리덕스 툴킷으로 다시 작성하기
