import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Main = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* <Signup
        onClick={() => {
          navigate("/estarlogin");
        }}
      >
        Login{" "}
      </Signup> */}

      <Button
        id="estarbtn"
        onClick={() => {
          navigate("/estarlist");
        }}
      >
        Duckstargram
      </Button>

      <Button
        onClick={() => {
          navigate("/realchat");
        }}
      >
        Duck-Chat
      </Button>
    </Layout>
  );
};

const Layout = styled.div`
  max-width: 1200px;
  min-width: 100vw;
  width: 100%;
  height: 101%;
  margin: 0 auto;
  overflow: hidden;
`;

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

// const Signup = styled.button`
//   text-align: center;
//   border: 2px solid black;
//   width: 100vh;
//   height: 30vh;
//   cursor: pointer;
//   font-size: 50px;
//   font-weight: 1000;
//   color: white;
//   background: #ff6e40;
//   color: #fff;
//   text-align: center;
//   transform: skew(0deg, -10deg);
//   filter: blur(4px);
//   transition: all 0.5s;
//   :hover {
//     filter: blur(0px);
//   }
//   animation: glow 1.5s ease-in-out infinite;
//   -webkit-animation: glow 1.5s ease-in-out infinite;
// `;

const Button = styled.button`
  cursor: pointer;
  width: 150%;
  height: 50vh;
  background-color: #f7efea;
  color: #ed5f33;
  transition: filter 0.5s;
  margin-left: -25vw;
  padding: 0;
  font-size: 50px;
  font-weight: 1000;
  transform: skew(0deg, -10deg);
  filter: blur(4px);
  :hover {
    filter: blur(0px);
  }
  &:last-child {
    background-color: #ed5f33;
    color: white;
  }
`;

export default Main;
