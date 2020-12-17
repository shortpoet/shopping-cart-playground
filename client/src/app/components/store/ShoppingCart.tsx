import { Queries } from "@constants/queries";
import * as React from "react";
import { useEffect, useState } from "react";
import { graphAxios } from "../../../common/utils/api";
import { StoreHeader } from "../layout/StoreHeader";
import { Transaction } from "@interfaces/Transaction";
import styled from "styled-components";
import { color } from "../../../common/theme";
import { FlexContainer } from "../layout";

interface ShoppingCartProps {
  user: string;
}

interface ShoppingCartState {}

const CartContainer = styled.div<any>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
  align-items: left;
  padding: 0rem 1rem;
  background-color: ${color.quaternary};
  box-shadow: 0 1px 0 0 ${color.box_shadow_tertiary};
`;

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  ...props
}): React.ReactElement => {
  const [data, setData] = useState({ transactions: [] });

  useEffect(() => {
    const getTransactions = async () => {
      const transactions = await graphAxios(Queries.TRANSACTIONS);
      console.log(transactions);

      setData(transactions);
    };
    getTransactions();
  }, []);
  return (
    <FlexContainer>
      <CartContainer className="shopping-cart">
        <h1>{props.user}'s Shopping Cart</h1>
        <dl>
          {data.transactions.map((transaction: Transaction) => (
            <React.Fragment key={transaction.id}>
              <dt>Transaction: {transaction.id}</dt>
              <dd>Total: {transaction.total}</dd>
              <dd>Rewards Points: {transaction.rewardsPoints}</dd>
            </React.Fragment>
          ))}
        </dl>
      </CartContainer>
    </FlexContainer>
  );
};

export { ShoppingCart };
