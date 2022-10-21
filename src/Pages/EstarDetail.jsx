import React from "react";
import { useNavigate } from "react-router-dom";
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
    </div>
  );
};

export default EstarDetail;
