import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Homebtn
      onClick={() => {
        navigate("/");
      }}
    >
      집으로
    </Homebtn>
  );
};

const Homebtn = styled.button`
  border: 3px solid black;
`;

export default Header;
