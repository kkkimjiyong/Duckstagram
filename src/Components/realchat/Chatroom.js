import React, { useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";
// import { initSocketConnection, disconnectSocket } from "./socket";
import { io } from "socket.io-client";
import socketIOClient from "socket.io-client";
import useInput from "../hooks/useInput";
import Header from "../estarlogin/Header";

const socket = io(
  "ws://hi-prac.shop:5000"
  // { path: "/socket.io", transports: ["websocket"] },
  // { cors: { origin: "ws://hi-prac.shop:5000" } }
);

const Chatroom = () => {
  //익명 채팅방인데 닉네임을 메세지 보낼때마다 정할 수 있고,
  //닉네임은 전에 작성됫던 밸류로 고정

  const Number = 0;
  const initialState = { nickname: "", message: "" };
  const [chatArr, setChatArr] = useState([]);
  const [message, Setmessage, onChange] = useInput(initialState);
  const SubmitHandler = async () => {
    await socket.emit("chatting", message);
    Setmessage(initialState);
    // Number++;
  };

  // const DeleteHandler = () => {
  //   message.i
  // }

  useEffect(() => {
    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    socket.on("receive", (message) => {
      console.log(message);
      setChatArr((chatArr) => chatArr.concat(message));
    }); //receive message이벤트에 대한 콜백을 등록해줌
  }, []);

  console.log(chatArr);
  return (
    <>
      <Header />
      <div>채팅방입니다.</div>
      <Chatbox>
        <ChatInput>
          <NicknameInput
            value={message.nickname}
            name="nickname"
            placeholder="닉네임(5자이내)"
            onChange={onChange}
          />
          <MessageInput
            value={message.message}
            name="message"
            onChange={onChange}
            placeholder="메시지를 입력해주세요"
          />
        </ChatInput>
        <SendBtn onClick={() => SubmitHandler()}>Send</SendBtn>
        {chatArr?.map((chat) => (
          <MessageBox>
            <div>닉네임={chat.nickname}</div>
            <div>메세지={chat.message}</div>
            {/* <SendBtn onClick={() => DeletHandler(chat)}>Send</SendBtn> */}
          </MessageBox>
        ))}
      </Chatbox>
    </>
  );
};

const ChatInput = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  gap: 30px;
`;

const MessageInput = styled.input`
  border: none;
  border-radius: 5px;
  box-shadow: 0px 3px 3px 0px gray;
  height: 50px;

  width: 400px;
  :hover {
    border: 2px dashed gray;
    box-shadow: 0px 3px 3px 2px gray;
    transform: scale(1.02);
  }
`;
const NicknameInput = styled.input`
  font-size: 12px;
  width: 100px;
  height: 50px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 3px 3px 0px gray;
  :hover {
    border: 2px dashed gray;
    box-shadow: 0px 3px 3px 2px gray;
    transform: scale(1.02);
  }
`;

const Chatbox = styled.div`
  margin: 200px auto 0 auto;
  position: relative;
  border-radius: 5px;
  padding: 20px;
  display: flex;
  width: 70vh;
  height: 70vh;
  border: 2px solid black;
  flex-direction: row;
  justify-content: flex-end;
`;

const MessageBox = styled.div`
  border: 2px solid black;
  width: 300px;
  height: 200px;
`;

const SendBtn = styled.button`
  border-radius: 20px;
  border: none;
  box-shadow: 0px 3px 3px 0px gray;
  bottom: 20px;
  position: absolute;
  width: 50px;
  height: 50px;
  :hover {
    transform: scale(1.05);
    box-shadow: 0px 3px 3px 2px gray;
  }
`;
export default Chatroom;
