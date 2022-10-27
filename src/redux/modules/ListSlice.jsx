import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { imageApi } from "../../mytools/instance";

// E스타그램 첫 페이지에 전체 게시물 (이미지들) 가져오기
export const __getLists = createAsyncThunk(
  "images/getLists",
  async (payload, thunkAPI) => {
    try {
      const { data } = await imageApi.getImages(payload);
      return thunkAPI.fulfillWithValue(data.data); //실제서버돌릴때는 data.data로 변경하기!!
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
      return thunkAPI.fulfillWithValue(data.data); //실제서버돌릴때는 data.data로 변경하기!!
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 게시물 삭제 DELET
export const __deleteEstar = createAsyncThunk(
  "estar/deleteestar",
  async (payload, thunkAPI) => {
    console.log("뭘가져오니", payload);
    try {
      const { data } = await imageApi.deletePost(payload);
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
      await imageApi.putPost(payload); // 서버한테 보낸상태
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  posts: [
    // {
    //   postId: 1,
    //   title: "제목",
    //   images: "이미지",
    //   content: "나의글",
    //   like: "👍",
    //   dislike: "👎",
    // },
  ],
  postlist: [],
  isLoading: false,
  error: null,
};

const listSlice = createSlice({
  name: "posts",
  initialState,
  // reducers: {},
  extraReducers: {
    // GET Lists!!! 첫 화면에 사진 리스트들(여러개!!) 보여주기!
    // [__getLists.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [__getLists.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.posts = action.payload;
    //   console.log("getLists fulfilled 상태", action.payload);
    // },
    // [__getLists.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
    // GET List!!! 디데일 화면에 사진 리스트(알맞은 1개!!) 보여주기!
    [__getList.pending]: (state) => {
      state.isLoading = true;
    },
    [__getList.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      state.postlist = action.payload;
    },
    [__getList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // 게시물 delete
    [__deleteEstar.pending]: (state) => {
      state.isLoading = true;
    },
    [__deleteEstar.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = state.posts.filter(
        (post) => action.payload !== post.PostId
      );
      window.location.replace("/estarlist");
    },
    [__deleteEstar.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      console.log("게시물삭제오류", state.error);
      Swal.fire("권한이 없습니다");
      // Swal.fire(state.error.response.data.errorMessage);
      // Swal.fire(state.error.response.data.message);
    },
    // PATCH 게시물 수정하기!!!
    [__updateEstar.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateEstar.fulfilled]: (state, action) => {
      state.posts = action.payload;
      // state.posts = newNewContent;
      state.isLoading = false;
    },
    [__updateEstar.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      Swal.fire("권한이 없습니다");
      // Swal.fire(state.error.response.data.errorMessage);
      // Swal.fire(state.error.response.data.message);
    },
  },
});
export default listSlice.reducer;
