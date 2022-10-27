// src/redux/modules/counterSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie } from "../../Components/estarlogin/cookiehook";
import Swal from "sweetalert2";

export const __postUserid = createAsyncThunk(
  "login/postuserid",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post("https://hi-prac.shop/api/users ", payload); //http://3.90.29.60/api/users
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
        "https://hi-prac.shop/api/users/login",
        payload
      );

      //바디값이 존재하면 바디값의 토큰을 쿠키에 저장한다.
      if (data.data) {
        setCookie("token", data.data.token, { path: "/" });
        setCookie("Nickname", data.data.nickname, { path: "/" });
      }
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
  loginStatus: "",
  token: "",
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
      state.todos = action.payload; // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
      // 회원가입성공 알럿창
      Swal.fire({
        title: "회원가입 성공!",
        width: 400,
        padding: "3em",
        color: "#716add",
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://user-images.githubusercontent.com/111853363/198197818-d1b3f9df-c9b7-4c10-ae5e-afdd96cddee6.gif")
          right bottom
          no-repeat
        `,
        imageUrl:
          "https://user-images.githubusercontent.com/111853363/198197818-d1b3f9df-c9b7-4c10-ae5e-afdd96cddee6.gif",
        imageHeight: 100,
      });
    },
    [__postUserid.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload.errorMessage; // catch 된 error 객체를 state.error에 넣습니다.
      Swal.fire({
        icon: "error",
        title: "중복된 아이디입니다",
        text: "다른 아이디로 가입해주세요",
        showConfirmButton: false,
        footer: '<a href="">로그인 화면으로 돌아가기</a>',
      });
    },
    [__postLoginid.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__postLoginid.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.login = true;
      // Store에 있는 todos에 서버에서 가져온 todos를 넣습니다.
      Swal.fire({
        title: "로그인 성공!",
        text: "덕스타그램에 오신걸 환영합니다",
        width: 400,
        padding: "3em",
        color: "#716add",
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://user-images.githubusercontent.com/111853363/198197818-d1b3f9df-c9b7-4c10-ae5e-afdd96cddee6.gif")
          right bottom
          no-repeat
        `,
        imageUrl:
          "https://user-images.githubusercontent.com/111853363/198197818-d1b3f9df-c9b7-4c10-ae5e-afdd96cddee6.gif",
        imageHeight: 100,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.replace("estarlist");
        }
      });
    },
    [__postLoginid.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = "에러입니다"; // catch 된 error 객체를 state.error에 넣습니다.
      Swal.fire({
        icon: "error",
        title: "없는 아이디와 비밀번호입니다",
        text: "회원가입을 진행해주세요",
        showConfirmButton: false,
        footer: '<a href="">로그인 화면으로 돌아가기</a>',
      });
    },
  },
});

export default loginSlice.reducer;
