import React from 'react';
import styled from 'styled-components';

const StyledFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
`;

const FlexContainer: React.FC<any> = ({ children }) => {
  return <StyledFlexContainer className="flex-container">{children}</StyledFlexContainer>;
};

export default FlexContainer;
