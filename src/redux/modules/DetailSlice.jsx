import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { detailApi } from "../../mytools/instance";

// 게시물별 댓글 post
export const __postDetailComment = createAsyncThunk(
  "comments/postComment",
  async (payload, thunkAPI) => {
    console.log("댓글저장으로 넘겨준값", payload);
    try {
      const { data } = await detailApi.postDetail(payload);
      return thunkAPI.fulfillWithValue(payload);
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
      console.log("너는무슨데이터?", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// 게시물별 댓글 삭제 DELET
export const __deleteDetailComment = createAsyncThunk(
  "comments/deleteComment",
  async (payload, thunkAPI) => {
    try {
      const { data } = await detailApi.deleteDetail(payload);
      console.log(data);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// 게시물별 댓글 PATCH 수정내용으로 저장!
export const __updateDetailComment = createAsyncThunk(
  "comments/updateComment",
  async (payload, thunkAPI) => {
    try {
      // const { newComment, newCommentId } = payload;
      await detailApi.patchDetail(payload); // 서버한테 보낸상태
      console.log("수정하기payload??", payload);
      return thunkAPI.fulfillWithValue(payload);
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
      state.comments.push({ comment: action.payload.comment });
      console.log("리듀서가받은거!", action.payload);
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
      state.comments = action.payload.data;
      console.log("겟해줘!", state.comments);
    },
    [__getDetailComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // 게시물별 댓글 delete
    [__deleteDetailComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteDetailComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      let delcomment = state.comments.filter(
        (comment) => action.payload !== comment.commentId
      );
      state.comments = delcomment;
    },
    [__deleteDetailComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // PATCH 게시물별 댓글!!! 게시물별 댓글 수정하기!!!
    [__updateDetailComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateDetailComment.fulfilled]: (state, action) => {
      let newComments = state.comments.map((comment) => {
        if (comment.commentId !== action.payload.commentId) {
          return comment;
        } else {
          return { ...comment, comment: action.payload.newComment };
        }
      });
      state.comments = newComments;
      state.isLoading = false;
    },
    [__updateDetailComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default detailSlice.reducer;
