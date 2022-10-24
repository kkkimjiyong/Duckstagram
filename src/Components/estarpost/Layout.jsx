import React from "react";
import styled from "styled-components";

const Layout = (props) => {
  return <LayoutCtn>{props.children}</LayoutCtn>;
};

export default Layout;

const LayoutCtn = styled.div`
  min-width: 500px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;
