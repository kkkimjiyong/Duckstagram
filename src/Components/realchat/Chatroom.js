import React, { useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";
// import { initSocketConnection, disconnectSocket } from "./socket";
import { io } from "socket.io-client";
import socketIOClient from "socket.io-client";
import useInput from "../hooks/useInput";
import Header from "../estarlogin/Header";
import { useRef } from "react";

const socket = io("https://hi-prac.shop");

// { path: "/socket.io", transports: ["websocket"] },
// { cors: { origin: "ws://hi-prac.shop:5000" } }

const Chatroom = () => {
  //익명 채팅방인데 닉네임을 메세지 보낼때마다 정할 수 있고,
  //닉네임은 전에 작성됫던 밸류로 고정

  const Number = 0;
  const initialState = { nickname: "", message: "", from: false };
  const [chatArr, setChatArr] = useState([]);
  const [message, Setmessage, onChange] = useInput(initialState);
  const [name, Setname] = useState("");
  const SubmitHandler = () => {
    console.log(name);
    socket.emit("chatting", {
      nickname: name,
      message: message.message,
      from: false,
    });
    Setmessage(initialState);
    // Number++;
  };

  // const DeleteHandler = () => {
  //   message.i
  // }

  //채팅 칠수록 스크롤 아래로 향하게
  // useEffect(() => {
  //   scrollToBottom();
  // }, []);

  // const scrollToBottom = () => {
  //   const { scrollHeight, clientHeight } = ref.current;
  //   ref.current.scrollTop = scrollHeight - clientHeight;
  // };

  useEffect(() => {
    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    socket.on("receive", (message, from) => {
      console.log(message);
      setChatArr((chatArr) => [
        ...chatArr,
        { nickname: message.nickname, message: message.message, from: from },
      ]);
      console.log(name);
    }); //receive message이벤트에 대한 콜백을 등록해줌
  }, []);

  console.log(chatArr);
  return (
    <>
      <Header />

      {/* 여기에 닉네임 넣으시면될 거 같아요 */}
      <Chatbox>
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "50%",
            marginLeft: "-100px",
          }}
        >
          익명 채팅방에 오신 것을 환영합니다 !
        </div>
        <ChatInput>
          <NicknameInput
            value={name}
            name="nickname"
            placeholder="닉네임(5자이내)"
            onChange={(e) => {
              console.log(name);
              Setname(e.target.value);
            }}
          />
          <MessageInput
            value={message.message}
            name="message"
            onChange={onChange}
            placeholder="메시지를 입력해주세요"
          />
        </ChatInput>
        <SendBtn onClick={() => SubmitHandler()}>Send</SendBtn>
        {chatArr?.map((chat) =>
          chat.from ? (
            <FromBox>
              <Words>닉네임={chat.nickname}</Words>
              <div>메세지={chat.message}</div>
              {/* <SendBtn onClick={() => DeletHandler(chat)}>Send</SendBtn> */}
            </FromBox>
          ) : (
            <MessageBox>
              <Words>닉네임:{chat.nickname}</Words>
              <Words>메세지:{chat.message}</Words>
              {/* <SendBtn onClick={() => DeletHandler(chat)}>Send</SendBtn> */}
            </MessageBox>
          )
        )}
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
  overflow: scroll;
  margin: 30px auto 0 auto;
  position: relative;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  width: 70vh;
  height: 70vh;
  border: 2px solid black;
  flex-direction: column;
  justify-content: flex-end;
`;

const MessageBox = styled.div`
  margin-top: 10px;
  left: 300px;
  bottom: 90px;
  position: relative;
  border-radius: 10px;
  box-shadow: 0px 3px 3px 0px gray;
  width: 300px;
  min-height: 80px; //메세지 높이 수정함----------------
  padding: 20px;
  overflow: hidden;
  background-color: white;
  text-overflow: ellipsis;
  display: flex;
  flex-direction: column;
  :hover {
    z-index: 999;
    transform: scale(1.05);
    box-shadow: 0px 3px 3px 2px gray;
  }
`;

const FromBox = styled.div`
  margin-top: 10px;
  right: 300px;
  bottom: 90px;
  position: relative;
  border-radius: 10px;
  box-shadow: 0px 3px 3px 0px gray;
  width: 300px;
  height: 100px;
  padding: 20px;
  overflow: hidden;
  background-color: red;
  text-overflow: ellipsis;
  :hover {
    z-index: 999;
    transform: scale(1.05);
    box-shadow: 0px 3px 3px 2px gray;
  }
`;

const SendBtn = styled.button`
  border-radius: 20px;
  border: none;
  box-shadow: 0px 3px 3px 0px gray;
  bottom: 20px;
  right: 20px;
  position: absolute;
  width: 50px;
  height: 50px;
  :hover {
    transform: scale(1.05);
    box-shadow: 0px 3px 3px 2px gray;
  }
`;

const Words = styled.div``;
export default Chatroom;
