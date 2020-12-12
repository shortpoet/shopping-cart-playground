import Faker from "faker";
import { define } from "typeorm-seeding";
import { ProductEntity } from "../../api/entity/ProductEntity";

define(ProductEntity, (faker: typeof Faker) => {
  // faker.seed(8);
  const product = new ProductEntity();
  product.productName = faker.commerce.productName();
  // 1/3 of products above 100
  product.cost = faker.random.number(2) == 0
    ? +faker.commerce.price(10, 99, 2)
    : +faker.commerce.price(1, 10, 2)
  return product;
});
