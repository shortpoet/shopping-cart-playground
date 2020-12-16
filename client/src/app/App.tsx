import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Transaction } from '../interfaces/Transaction';

import { StoreFront } from "./components/StoreFront";

const STORE_NAME = 'Shopping Cart Playground';

const transactions: Transaction[] = [];

ReactDOM.render(
  <StoreFront storeName={STORE_NAME} transactions={transactions}/>,
  document.getElementById('app')
);