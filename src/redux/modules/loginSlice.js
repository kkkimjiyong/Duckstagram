// src/redux/modules/counterSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const __postUserid = createAsyncThunk(
  "login/postuserid",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post("http://13.124.143.112/api/users", payload);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postLoginid = createAsyncThunk(
  "login/postLoginid",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(
        "http://13.124.143.112/api/users/login",
        payload,
        {
          withCredentials: true,
        }
      );

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  UserInfo: [],
  isLoading: false,
  error: "",
  login: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: {
    [__postUserid.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__postUserid.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      console.log(action.payload);
      state.todos = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__postUserid.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload.erroMessage; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__postLoginid.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__postLoginid.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      console.log(action.payload);
      state.login = true; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
    },
    [__postLoginid.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = "에러입니다"; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
});

export default loginSlice.reducer;
