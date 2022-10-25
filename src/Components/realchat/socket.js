import React from "react";
import { io } from "socket.io-client";
import styled from "styled-components";

const Socket = () => {
  const socket = io("http://localhost:3000", {
    cors: {
      origin: "*",
    },
  });

  const handleRequestSocket = () => {
    socket.emit("test", {
      data: "test socket on client",
    });
  };
  return (
    <div>
      test socket connection
      <TestBtn onClick={handleRequestSocket}>Request</TestBtn>
    </div>
  );
};

const TestBtn = styled.button`
  border: 3px solid black;
`;

export default Socket;
