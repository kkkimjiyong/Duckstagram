import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { __postLoginid, __postUserid } from "../../redux/modules/loginSlice";
import useInput from "../hooks/useInput";
import Swal from "sweetalert2";

const Profile = () => {
  //랜덤닉네임 api 근데 두개식 묶여서 나온다.
  // const word = RandomApi();
  const dispatch = useDispatch();

  const { error, isLoading, login } = useSelector((state) => state.login);
  //이 페이지에서 유저정보들을 get해와서 대조해야하나?

  const initialstate = {
    loginId: "",
    nickname: "",
    password: "",
    confirm: "",
  };

  // const { token } = useSelector((state) => state.login.token);

  const [Signup, SetSignup, onChangehandler] = useInput(initialstate);

  const [isEdit, SetisEdit] = useState(false);

  //비밀번호 8자리+ 특수문자 1개
  const specialLetter = Signup.password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
  const isValidPassword = Signup.password.length >= 8 && specialLetter >= 1;
  //아이디는 5자리 + 특수문자 1개
  const isValidloginId = Signup.loginId.length >= 5 && specialLetter >= 1;

  //커스텀훅으로 빼자.
  // const onChangehandler = (e) => {
  //   const { name, value } = e.target;
  //   console.log(Signup);
  //   SetSignup({ ...Signup, [name]: value });
  // };
  // const [Signup, SetSignup] = useState(initialstate);

  const onSubmithandler = (e) => {
    //회원가입화면
    if (isEdit) {
      dispatch(__postUserid(Signup));
      // 회원가입성공 알럿창
      Swal.fire({
        title: "회원가입 성공!",
        width: 400,
        padding: "3em",
        color: "#716add",
        background: "#fff url(넣고싶은이미지-박스안)",
        backdrop: `
          rgba(0,0,123,0.4)
          url("고싶은이미지-전체배경(움직이는거가능)")
          left top
          no-repeat
        `,
      });
      SetSignup(initialstate);
      SetisEdit(!isEdit);
    } else {
      //로그인화면
      dispatch(
        __postLoginid({ password: Signup.password, loginId: Signup.loginId })
      );

      // dispatch(__postLoginid(getCookie("token")));
      // console.log({ password: Signup.password, loginId: Signup.loginId });
      // SetSignup(initialstate);
      //로그인 성공시, 메인으로 가야함.
      //로그인 조건을 걸어야할듯?
    }
  };

  if (isLoading) {
    <div>로딩중입니당</div>;
  } else if (error) {
    //   if (window.confirm("아이디와 비밀번호를 확인해주세요"))
    //     window.location.replace("/estarlogin");
    // } else {
    //   if (login) {
    //     Swal.fire({
    //       icon: "success",
    //       title: "로그인 성공😊",
    //       showConfirmButton: true,
    //       confirmButtonText: '<a href="/estarlist">  Estagram 바로가기</a>',
    //       // : '<a href="/">메인으로 돌아가기',
    //       footer: '<a href="/">메인으로 돌아가기</a>',
    //     });
  } else {
    return (
      <>
        <AddTodoCtn>
          <AddTodoCtnArea>
            <AddTodoBox>
              <AddTodoTitle>닉네임</AddTodoTitle>
              <AddTodoTextarea
                value={Signup.loginId}
                name="loginId"
                onChange={onChangehandler}
              />
            </AddTodoBox>
            <AddTodoBox>
              {isEdit && (
                <>
                  <AddTodoTitle>닉네임</AddTodoTitle>
                  <AddTodoInput
                    value={Signup.nickname}
                    name="nickname"
                    onChange={onChangehandler}
                  />
                </>
              )}
            </AddTodoBox>
            <AddTodoBox>
              <AddTodoTitle>비밀번호</AddTodoTitle>
              <AddTodoTextarea
                value={Signup.password}
                name="password"
                onChange={onChangehandler}
                placeholder="8자리이상, 특수문자 1개이상"
              />
            </AddTodoBox>
            <AddTodoBox>
              {isEdit && (
                <>
                  <AddTodoTitle>비밀번호 재확인</AddTodoTitle>
                  <AddTodoTextarea
                    value={Signup.confirm}
                    name="confirm"
                    onChange={onChangehandler}
                  />
                </>
              )}
            </AddTodoBox>
          </AddTodoCtnArea>
          <BtnSet>
            <PostBtn
              // disabled={
              //   !isValidPassword || !isValidloginId ? "disabled" : false
              // }
              type="submit"
              style={{ margin: "auto" }}
              onClick={() => {
                onSubmithandler();
              }}
            >
              {isEdit ? "DONE" : "SIGN IN"}
            </PostBtn>
            <PostBtn
              disabled={isValidPassword || isValidloginId ? "disabled" : false}
              style={{ margin: "auto" }}
              onClick={() => {
                SetisEdit(!isEdit);
                SetSignup(initialstate);
              }}
            >
              {isEdit ? "RETRUN" : "SIGN UP"}
            </PostBtn>
          </BtnSet>
        </AddTodoCtn>
        {/* <Line></Line> */}
      </>
    );
  }
};
// };

const AddTodoCtn = styled.div`
  margin: 50px auto 0 auto;
  max-width: 500px;
  max-height: 800px;
  height: calc(100vh - 60px);
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background: rgb(255, 110, 64);
  background: linear-gradient(
    0deg,
    rgba(255, 110, 64, 1) 0%,
    rgba(255, 255, 255, 0) 59%
  );
  justify-content: space-between;
  border-radius: 10px;
  box-shadow: 5px 5px 10px #babebc;
  width: 768px;
  min-height: 480px;
`;
const AddTodoCtnArea = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
  height: 100%;
`;
const AddTodoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;
const AddTodoTitle = styled.h3`
  font-size: 24px;
  font-weight: 400;
`;
const AddTodoInput = styled.input`
  box-shadow: inset 4px 2px 10px #babebc, inset -5px -5px 12px #fff;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 0 12px;
  height: 46px;
  font-size: 14px;
`;
const AddTodoTextarea = styled.input`
  box-shadow: inset 4px 2px 10px #babebc, inset -5px -5px 12px #fff;
  border-radius: 40px;
  border: none;
  padding: 12px;
  min-height: 60px;
  font-size: 14px;
`;
const BtnSet = styled.div`
  display: flex;
  flex-direction: row;
`;

const PostBtn = styled.button`
  box-shadow: 5px 5px 8px #babebc;
  border-radius: 10px;
  background-color: white;
  height: 60px;
  width: 120px;
  :hover {
    transform: scale(1.1);
    background-color: white;
    box-shadow: 0px 3px 3px 0px gray;
  }
`;

// const Line = styled.div`
//   position: absolute;
//   width: 1200px;
//   bottom: 400px;
//   height: 300px;
//   background: #ff6f00;
//   z-index: -1;
// `;

export default Profile;
