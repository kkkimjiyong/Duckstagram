import React from "react";
import { useNavigate } from "react-router-dom";
import Detail from "../Components/estardetail/detail";
const EstarDetail = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          navigate("/estarlist");
        }}
      >
        다시 리스트로 가기
      </button>
      <Detail />
    </div>
  );
};

export default EstarDetail;
