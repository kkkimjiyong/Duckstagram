import React from "react";
import { useNavigate } from "react-router-dom";
import List from "../Components/estarlist/list";
import Header from "../Components/estarlogin/Header";
import Layout from "../Components/estarlogin/Layout";

const EstarList = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <Header />
      <List />
    </Layout>
  );
};

export default EstarList;
