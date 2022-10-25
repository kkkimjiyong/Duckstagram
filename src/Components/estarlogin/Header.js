import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCookies } from "react-cookie";

const Header = () => {
  const navigate = useNavigate();

  const [removeCookie] = useCookies();
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
          navigate("/estarprofile");
        }}
      >
        Profile
      </PostBtn>
      <PostBtn
        onClick={() => {
          if (window.confirm("로그아웃하시겠습니까?!?!?!?!"))
            removeCookie("token");
        }}
      >
        Logout
      </PostBtn>
    </TopCtn>
  );
};
const TopCtn = styled.div`
  background-color: #ff6e40;
  position: sticky;
  padding: 15px;
  top: 0px;
  width: 100%;
  z-index: 999;
  display: flex;
  justify-content: space-evenly;
`;
const Homebtn = styled.button`
  box-shadow: 0px 3px 3px 0px black;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: #ff8f00;
  :hover {
    background-color: #ef6c00;
    color: white;
    transform: scale(1.1);
  }
`;

const PostBtn = styled.button`
  box-shadow: 0px 3px 3px 0px black;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: #ff8f00;
  :hover {
    background-color: #ef6c00;
    color: white;
    transform: scale(1.1);
  }
`;

export default Header;
