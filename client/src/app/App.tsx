import React from "react";
import { Transaction } from "../interfaces/Transaction";
import { StoreFront } from "./components/StoreFront";

const STORE_NAME = "Shopping Cart Playground";

const transactions: Transaction[] = [];

const App = () => {
  return (<StoreFront storeName={STORE_NAME} transactions={transactions} />);
};

export default App;
