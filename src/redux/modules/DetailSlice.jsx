import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { detailApi } from "../../mytools/instance";

// 게시물별 댓글 post
export const __postDetailComment = createAsyncThunk(
  "comments/postComment",
  async (payload, thunkAPI) => {
    try {
      const { data } = await detailApi.postDetail(payload);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// 게시물별  댓글 get
export const __getDetailComment = createAsyncThunk(
  "comments/getComment",
  async (payload, thunkAPI) => {
    try {
      const { data } = await detailApi.getDetail(payload);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  comments: [
    {
      commentId: 0,
      comment: "",
    },
  ],
  isLoading: false,
  error: null,
};

const detailSlice = createSlice({
  name: "comments",
  initialState,
  extraReducers: {
    // 게시물별 댓글 post
    [__postDetailComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__postDetailComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments.push(action.payload);
    },
    [__postDetailComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // 게시물별 댓글 get
    [__getDetailComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__getDetailComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.dadats = action.payload;
    },
    [__getDetailComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default detailSlice.reducer;
