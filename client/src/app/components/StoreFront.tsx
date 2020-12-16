import * as React from "react";
import { Transaction } from "../../interfaces/Transaction";

export interface StoreFrontProps {
  storeName: string;
  transactions: Transaction[];
};

export interface StoreFrontState {

};

export class StoreFront extends React.Component<StoreFrontProps, StoreFrontState> { 
  render(): React.ReactNode {
    return <header className="store-header">{ this.props.storeName }</header>
  }
};