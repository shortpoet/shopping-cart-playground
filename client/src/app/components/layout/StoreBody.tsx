import * as React from "react";
import { Transaction } from "../../../common/interfaces/Transaction";
import styled from 'styled-components';

export interface StoreFrontProps {
  storeName: string;
  transactions: Transaction[];
}

export interface StoreFrontState {}

const StyledBody = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Body: React.FC<any> = ({ children }) => { 
  return <StyledBody className="store-body">{ children }</StyledBody>
};

export default Body;
