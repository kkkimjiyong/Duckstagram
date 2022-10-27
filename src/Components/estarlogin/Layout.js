import React from "react";
import styled from "styled-components";

const Layout = (props) => {
  return <LayoutCtn>{props.children}</LayoutCtn>;
};

const LayoutCtn = styled.div`
  max-width: 1200px;
  min-width: 800px;
  width: 100%;
  height: 100%; //이거 회원가입창 때문에 101% 에서 vh로 단위 바꿨어용,,
  margin: 0 auto;
  overflow: hidden;
`;

export default Layout;
