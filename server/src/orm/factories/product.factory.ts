import Faker from "faker";
const fakerInstance = require("faker");
import { define } from "typeorm-seeding";
import { ProductEntity } from "../../api/entity/ProductEntity";

define(ProductEntity, (faker: typeof Faker): ProductEntity => {
  faker.seed(8);
  const product = new ProductEntity();
  product.productName = fakerInstance.unique(faker.commerce.productName());
  // 1/3 of products above 100
  product.cost = faker.random.number(2) == 0
    ? +faker.commerce.price(100, 999, 2)
    : +faker.commerce.price(1, 99, 2)
  return product;
});
