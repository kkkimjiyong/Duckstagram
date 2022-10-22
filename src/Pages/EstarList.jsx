import React from "react";
import { useNavigate } from "react-router-dom";
import List from "../Components/estarlist/list";

const EstarList = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          navigate("/estarpost");
        }}
      >
        작성하기
      </button>
      <List />
    </div>
  );
};

export default EstarList;
