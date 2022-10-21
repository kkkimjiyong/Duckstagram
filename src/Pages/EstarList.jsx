import React from "react";
import { useNavigate } from "react-router-dom";

const EstarList = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          navigate("/estardetail");
        }}
      >
        디테일로가는곳
      </button>
      <button
        onClick={() => {
          navigate("/estarpost");
        }}
      >
        작성하기
      </button>
    </div>
  );
};

export default EstarList;
