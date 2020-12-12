import { Transaction } from "@src/interfaces/Transaction";
import Faker from "faker";
import { define, factory } from "typeorm-seeding";
import { ProductEntity } from "../../api/entity/ProductEntity";
import { PurchaseEntity } from "../../api/entity/PurchaseEntity";
import { Product } from "../../interfaces/Product";
import { Purchase } from "../../interfaces/Purchase";

interface Context {
  productId: Product['id'];
  transactionId: Transaction['id'];
}

define(PurchaseEntity, (faker: typeof Faker, context: Context): Purchase => {
  // faker.seed(8);
  const { productId, transactionId } = context;
  const purchase = new PurchaseEntity();
  purchase.product = factory(ProductEntity)() as any;
  purchase.productId = productId;
  purchase.transactionId = transactionId;
  purchase.quantity = faker.random.number({ min: 1, max: 5 });
  return purchase;
});
