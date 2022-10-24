import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  const navigate = useNavigate();
  return (
    <TopCtn>
      <Homebtn
        onClick={() => {
          navigate("/");
        }}
      ></Homebtn>
    </TopCtn>
  );
};

const Homebtn = styled.button`
  border: 3px solid black;
  width: 40px;
  height: 40px;
`;
const TopCtn = styled.div`
  background-color: aliceblue;
  position: sticky;
  padding-top: 30px;
  top: -20px;
  width: 100vh;
`;

export default Header;
