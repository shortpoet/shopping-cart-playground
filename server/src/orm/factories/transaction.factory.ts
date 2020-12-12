import { Purchase } from "@src/interfaces/Purchase";
import { Transaction } from "@src/interfaces/Transaction";
import Faker from "faker";
import { define, factory } from "typeorm-seeding";
import { CustomerEntity } from "../../api/entity/CustomerEntity";
import { PurchaseEntity } from "../../api/entity/PurchaseEntity";
import { TransactionEntity } from "../../api/entity/TransactionEntity";
import { Customer } from "../../interfaces/Customer";

interface Context {
  customerId: Customer['id'];
  transactionId: Transaction['id'];
  total: Transaction['total'];
  rewardsPoints: Transaction['rewardsPoints'];
}
define(TransactionEntity, (faker: typeof Faker, context: Context) => {
  // faker.seed(8);
  const { customerId, transactionId, total, rewardsPoints } = context;
  const transaction = new TransactionEntity();
  transaction.id = transactionId;
  transaction.customerId = customerId;
  transaction.total = total;
  transaction.rewardsPoints = rewardsPoints;
  return transaction;
});
