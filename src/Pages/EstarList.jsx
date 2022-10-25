import React from "react";
import { useNavigate } from "react-router-dom";
import List from "../Components/estarlist/list";
import Header from "../Components/estarlogin/Header";

const EstarList = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <List />
    </div>
  );
};

export default EstarList;
