import { Transaction } from "@src/interfaces/Transaction";
import Faker from "faker";
import { define, factory } from "typeorm-seeding";
import { ProductEntity } from "../../api/entity/ProductEntity";
import { PurchaseEntity } from "../../api/entity/PurchaseEntity";
import { Product } from "../../interfaces/Product";
import { Purchase } from "../../interfaces/Purchase";

interface Context {
  productId: Product['id'];
  quantity: Purchase['quantity'];
  transactionId: Transaction['id'];
}

define(PurchaseEntity, (faker: typeof Faker, context: Context): Purchase => {
  // faker.seed(8);
  console.log(context);
  
  const { productId, transactionId, quantity } = context;
  const purchase = new PurchaseEntity();
  purchase.product = factory(ProductEntity)() as any;
  purchase.productId = productId;
  purchase.transactionId = transactionId;
  purchase.quantity = quantity;
  return purchase;
});
