import { Cart, Layout } from "@constants/index";
import React from "react";
import { Transaction } from "../common/interfaces/Transaction";
import { StoreMainBox, StoreHeader, StoreBody, StoreMain } from "./components/layout";
import {  } from "./components/layout/StoreHeader";
import { ShoppingCart } from "./components/store/ShoppingCart";

const STORE_NAME = "Shopping Cart Playground";

const transactions: Transaction[] = [];

const App = () => {
  return (
    <StoreBody>
      <StoreHeader storeName={Layout.STORE_NAME}/>
      <StoreMain>
        <StoreMainBox>
          <ShoppingCart user={ Cart.DEFAULT_USER }/>
        </StoreMainBox>
      </StoreMain>
    </StoreBody>
  );
};

export default App;
