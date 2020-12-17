import { Layout } from "@constants/layout";
import React from "react";
import styled from "styled-components";
import { color } from "../../../common/theme";
import { LogoImg } from "./LogoImg";

interface FooterProps {
  storeName: string;
}

const FooterContainer = styled.div<any>`
  display: flex;
  min-height: ${Layout.FOOTER_HEIGHT};
  justify-content: space-between;
  align-items: center;
  padding: 0rem 1rem;
  background-color: ${color.primary};
  box-shadow: 0 1px 0 0 ${color.box_shadow_tertiary};
`;

const Footer: React.FC<FooterProps> = ({ ...props }) => {
  return <footer className="store-footer">{props.storeName}</footer>;
};

const StoreFooter: React.FC<FooterProps> = ({ ...props }) => {
  return (
    <FooterContainer className="store-footer-container" {...props}>
      <Footer {...props}/>
      <LogoImg />
    </FooterContainer>
  );
};

export { StoreFooter, FooterProps };
