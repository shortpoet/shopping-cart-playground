const Queries = {
  TRANSACTIONS: `
  {
    transactions {
      id
      customerId
      total
      rewardsPoints
      customer {
        id
        firstName
        lastName
      }
      purchases {
        id
        productId
        transactionId
        quantity
        product {
          id
          productName
          cost
        }
      }
    }
  }
`,
};

export { Queries };
