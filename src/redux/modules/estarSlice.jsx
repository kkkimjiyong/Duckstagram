import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
      const { data } = await axios.post("http://localhost:3001/posts", payload);
      console.log(data);
      return thunkAPI.fulfillWithValue(data);
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
