import React from "react";
// 1. react-router-dom을 사용하기 위해서 아래 API들을 import 합니다.
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../Pages/Main";
import EstarList from "../Pages/EstarList";
import EstarDetail from "../Pages/EstarDetail";
import EstarPost from "../Pages/EstarPost";
import EstarLogin from "../Pages/EstarLogin";
import Realchat from "../Pages/Realchat";

// 2. Router 라는 함수를 만들고 아래와 같이 작성합니다.
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/estarlist" element={<EstarList />} />
        <Route path="/estardetail/:id" element={<EstarDetail />} />
        <Route path="/estarpost" element={<EstarPost />} />
        <Route path="/estarlogin" element={<EstarLogin />} />
        <Route path="/realchat" element={<Realchat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
