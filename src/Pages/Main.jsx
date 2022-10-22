import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Main = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        onClick={() => {
          navigate("/estarlist");
        }}
      >
        리스트로 가자
      </Button>
      <Button
        onClick={() => {
          navigate("/estarlogin");
        }}
      >
        회원가입
      </Button>
    </>
  );
};

const Button = styled.button`
  background-color: aliceblue;
  border: 2px solid black;
  margin: 0 auto;
  margin-top: 20px;
`;

export default Main;
