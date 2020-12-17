import React from "react";
import styled from "styled-components";
import { color } from "../../../common/theme";
import { LogoImg } from "./LogoImg";

interface HeaderProps {
  storeName: string;
}

const HeaderContainer = styled.div<any>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 1rem;
  min-height: 6%;
  background-color: ${color.primary};
  box-shadow: 0 1px 0 0 ${color.box_shadow_tertiary};
`;

const Header: React.FC<HeaderProps> = ({ ...props }) => {
  return <header className="store-header">{props.storeName}</header>;
};

const StoreHeader: React.FC<HeaderProps> = ({ ...props }) => {
  return (
    <HeaderContainer {...props}>
      <Header {...props}/>
      <LogoImg />
    </HeaderContainer>
  );
};

export { StoreHeader, HeaderProps };
