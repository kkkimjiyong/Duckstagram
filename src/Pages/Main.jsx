import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Main = () => {
  const navigate = useNavigate();

  return (
    <>
      <Signup
        onClick={() => {
          navigate("/estarlogin");
        }}
      >
        Login
      </Signup>
      <Button
        onClick={() => {
          navigate("/estarlist");
        }}
      >
        Estargram
      </Button>

      <Button
        onClick={() => {
          navigate("/realchat");
        }}
      >
        Chat
      </Button>
    </>
  );
};

// const Mainctn = styled.div`
//   background: linear-gradient(
//     to right,
//     rgba(36, 31, 31, 1) 0%,
//     rgba(36, 31, 31, 1) 32%,
//     rgba(74, 71, 70, 1) 100%
//   );
//   color: #fff;
//   width: 100vh;
//   height: 100vh;
// `;

const Signup = styled.button`
  text-align: center;
  border: 2px solid black;
  width: 100vh;
  height: 30vh;
  cursor: pointer;
  font-size: 30px;
  color: white;
  background: #ff6e40;
  color: #fff;
  text-align: center;
  transform: skew(0deg, -10deg);
  filter: blur(8px);
  transition: all 0.5s;
  :hover {
    filter: blur(0px);
  }
  animation: glow 1.5s ease-in-out infinite;
  -webkit-animation: glow 1.5s ease-in-out infinite;
`;

const Button = styled.button`
  cursor: pointer;
  filter: blur(8px);
  width: 100vh;
  height: 30vh;
  background-color: #ffa06d;
  transition: all 0.5s;
  margin: 0 auto;
  font-size: 30px;
  transform: skew(0deg, -10deg);
  filter: blur(8px);
  :hover {
    filter: blur(0px);
  }
  &:last-child {
    background-color: #c53d13;
    color: white;
  }
`;

export default Main;
