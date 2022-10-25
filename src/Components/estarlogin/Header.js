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
      >
        Main
      </Homebtn>

      <PostBtn
        onClick={() => {
          navigate("/estarpost");
        }}
      >
        Post
      </PostBtn>

      <PostBtn
        onClick={() => {
          navigate("/estarpost");
        }}
      >
        Profile
      </PostBtn>
    </TopCtn>
  );
};
const TopCtn = styled.div`
  background-color: #ff6e40;
  position: sticky;
  padding: 15px;
  top: 0px;
  width: 100vh;
  z-index: 999;
  display: flex;
  justify-content: space-evenly;
`;
const Homebtn = styled.button`
  box-shadow: 0px 3px 3px 0px black;
  width: 40px;
  height: 40px;
`;

const PostBtn = styled.button`
  box-shadow: 0px 3px 3px 0px black;
  width: 40px;
  height: 40px;
`;

export default Header;
