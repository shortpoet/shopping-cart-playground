import Faker from "faker";
import { define, factory } from "typeorm-seeding";
import { CustomerEntity } from "../../api/entity/CustomerEntity";
import { PurchaseEntity } from "../../api/entity/PurchaseEntity";
import { TransactionEntity } from "../../api/entity/TransactionEntity";
import { Customer } from "../../interfaces/Customer";

define(TransactionEntity, (faker: typeof Faker) => {
  faker.seed(8);
  const transaction = new TransactionEntity();
  const customer: Customer = factory(CustomerEntity) as any;
  transaction.customerId = customer.id;
  transaction.purchases = [...Array(+faker.random.number({ min: 1, max: 8 })).keys()].map(i => ({ ...factory(PurchaseEntity), transactionId: transaction.id }) as any);
  //   A customer receives 2 points for every dollar spent over $100 in each transaction, plus 1 point for every dollar spent over $50 in each transaction
  // (e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points).
  transaction.total = transaction.purchases.reduce((total, purchase) => total += purchase.product.cost * purchase.quantity, 0);
  const rewardsPoints = 
    transaction.total > 50 && transaction.total <= 100
      ? transaction.total += (transaction.total - 50)
      : transaction.total > 100
        ? transaction.total += (50 + ((transaction.total - 100) * 2))
        : 0
  ;
  transaction.rewardsPoints = rewardsPoints;
  return transaction;
});
