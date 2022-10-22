import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { imageApi } from "../../mytools/instance";

// E스타그램 첫 페이지에 전체 게시물 (이미지들) 가져오기
export const __getLists = createAsyncThunk(
  "images/getLists",
  async (payload, thunkAPI) => {
    try {
      const { data } = await imageApi.getImages(payload);
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data); //API에서는 data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// E스타그램 디테일 페이지에 각 param id에 맞는 게시물(이미지1개) 가져오기
export const __getList = createAsyncThunk(
  "image/getList",
  async (payload, thunkAPI) => {
    try {
      const { data } = await imageApi.getImage(payload);
      return thunkAPI.fulfillWithValue(data.data); //API에서는 data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  posts: [
    {
      postId: 1,
      title: "제목",
      images: "이미지",
      content: "나의글",
      like: "👍",
      dislike: "👎",
    },
  ],
  isLoading: false,
  error: null,
};

const listSlice = createSlice({
  name: "posts",
  initialState,
  // reducers: {},
  extraReducers: {
    // GET Lists!!! 첫 화면에 사진 리스트들(여러개!!) 보여주기!
    [__getLists.pending]: (state) => {
      state.isLoading = true;
    },
    [__getLists.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
      console.log("fulfilled 상태", action.payload);
    },
    [__getLists.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // GET List!!! 디데일 화면에 사진 리스트(알맞은 1개!!) 보여주기!
    [__getList.pending]: (state) => {
      state.isLoading = true;
    },
    [__getList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    [__getList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export default listSlice.reducer;
