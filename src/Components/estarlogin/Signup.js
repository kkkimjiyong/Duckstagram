import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { __postLoginid, __postUserid } from "../../redux/modules/loginSlice";
import RandomApi from "../../mytools/RandomApi";
import { Navigate, useNavigate } from "react-router-dom";


const Signup = () => {
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
    if (window.confirm("아이디와 비밀번호를 확인해주세요"))
      window.location.replace("/estarlogin");
  } else {
    if (login) {
      window.confirm("로그인 성공! 메인으로 돌아갑니다.");
      window.location.replace("/");
    } else {
      return (
        <>
          <AddTodoCtn>
            <AddTodoCtnArea>
              <AddTodoBox>
                <AddTodoTitle>아이디</AddTodoTitle>
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
                {isEdit ? "가입완료" : "로그인"}
              </PostBtn>
              <PostBtn
                disabled={
                  isValidPassword || isValidloginId ? "disabled" : false
                }
                style={{ margin: "auto" }}
                onClick={() => {
                  SetisEdit(!isEdit);
                  SetSignup(initialstate);
                }}
              >
                {isEdit ? "돌아가기" : "회원가입"}
              </PostBtn>
            </BtnSet>
          </AddTodoCtn>
        </>
      );
    }
  }
};

const AddTodoCtn = styled.div`
  margin: 20px auto 0 auto;
  max-width: 500px;
  max-height: 800px;
  height: calc(100vh - 60px);
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  gap: 20px;
  flex-direction: column;
  background: #ebecf0;
  justify-content: space-between;
  border-radius: 10px;
  box-shadow: -5px -5px 10px #fff, 5px 5px 10px #babebc;

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
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 0 12px;
  height: 46px;
  font-size: 14px;
`;
const AddTodoTextarea = styled.textarea`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 12px;
  min-height: 60px;
  font-size: 14px;
`;
const BtnSet = styled.div`
  display: flex;
  flex-direction: row;
`;

const PostBtn = styled.button`
  box-shadow: -5px -5px 10px #fff, 5px 5px 8px #babebc;
  border-radius: 10px;
  height: 60px;
  width: 120px;
  :hover {
    background-color: white;
  }
`;

export default Signup;
