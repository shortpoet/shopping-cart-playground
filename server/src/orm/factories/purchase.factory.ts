import Faker from "faker";
import { define, factory } from "typeorm-seeding";
import { ProductEntity } from "../../api/entity/ProductEntity";
import { PurchaseEntity } from "../../api/entity/PurchaseEntity";
import { Product } from "../../interfaces/Product";
import { Purchase } from "../../interfaces/Purchase";

define(PurchaseEntity, (faker: typeof Faker): Purchase => {
  faker.seed(8);
  const purchase = new PurchaseEntity();
  const product: Product = factory(ProductEntity) as any;
  purchase.product = product;
  purchase.productId = product.id;
  // 1/3 of products above 100
  purchase.quantity = faker.random.number({ min: 1, max: 8 });
  return purchase;
});
