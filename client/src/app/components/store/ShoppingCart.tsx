import * as React from "react";
import { Transaction } from "../../../common/interfaces/Transaction";
import { StoreHeader } from "../layout/StoreHeader";

export interface ShoppingCartProps {
  user: string;
}

export interface ShoppingCartState {}

export class ShoppingCart extends React.Component<
ShoppingCartProps,
ShoppingCartState
> {
  render(): React.ReactNode {
    return (
      <div className="App">
        <h1>{ this.props.user }'s Shopping Cart</h1>
      </div>
    );
  }
}
