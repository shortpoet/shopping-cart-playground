import { Layout } from "@constants/index";
import React from "react";
import styled from "styled-components";

const StyledMain = styled.main`
  min-height: calc(100vh - ${Layout.HEADER_HEIGHT} - ${Layout.FOOTER_HEIGHT});
  flex-grow: 1;
`;

const Main: React.FC<any> = ({ children }) => {
  return <StyledMain className="styled-main">{children}</StyledMain>;
};

export default Main;
