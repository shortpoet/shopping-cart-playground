import React from "react";
import { color } from "../../../common/theme";
import styled from "styled-components";

const StyledMainBox = styled.main`
  height: 100%;
`;

const MainBox: React.FC<any> = ({ children }) => {
  return <StyledMainBox className="styled-main-box">{children}</StyledMainBox>;
};

export default MainBox;
