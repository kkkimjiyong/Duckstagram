import React from "react";
import styled from "styled-components";

const Chatroom = () => {
  return (
    <>
      <div>채팅방입니다.</div>
      <Chatbox>
        <MessageInput></MessageInput>
        <button></button>
      </Chatbox>
    </>
  );
};

const MessageInput = styled.input`
  border: 2px solid black;
  border-radius: 5px;
  height: 50px;
`;

const Chatbox = styled.div`
  border-radius: 5px;
  padding: 20px;
  display: flex;
  width: 70vh;
  height: 60vh;
  border: 2px solid black;
  flex-direction: column;
  justify-content: flex-end;
`;

const SendBtn = styled.button``;
export default Chatroom;
