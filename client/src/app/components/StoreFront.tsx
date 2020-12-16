import * as React from "react";
import { Transaction } from "../../interfaces/Transaction";
import { StoreHeader } from "./StoreHeader";

export interface StoreFrontProps {
  storeName: string;
  transactions: Transaction[];
}

export interface StoreFrontState {}

export class StoreFront extends React.Component<
  StoreFrontProps,
  StoreFrontState
> {
  render(): React.ReactNode {
    return (
      <div className="App">
        <StoreHeader storeName={this.props.storeName} />
      </div>
    );
  }
}
