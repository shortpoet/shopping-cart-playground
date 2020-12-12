import { factory } from "typeorm-seeding";
import { CustomerEntity } from "./api/entity/CustomerEntity";
import { ProductEntity } from "./api/entity/ProductEntity";
import { PurchaseEntity } from "./api/entity/PurchaseEntity";
import { TransactionEntity } from "./api/entity/TransactionEntity";
import { Customer } from "./interfaces/Customer";

const faker = require("faker");
faker.seed(8);
const product = new ProductEntity();
product.productName = faker.commerce.productName();
// 1/3 of products above 100
product.cost = faker.random.number(2) == 0
  ? +faker.commerce.price(100, 999, 2)
  : +faker.commerce.price(1, 99, 2)


// const transaction = new TransactionEntity();
// transaction.id = +Date.now();
// const customer: Customer = factory(CustomerEntity)() as any;
// transaction.customerId = customer.id;

// console.log(factory(PurchaseEntity)().create());

const x = {
  test: "test"
}

const purchases = [...Array(+faker.random.number({ min: 1, max: 8 })).keys()].map(i => ({ ...x, transactionId: Date.now() }) as any);

// for (let index = 0; index < 10; index++) {
//   console.log(faker.random.number(2));
  
// }

console.log(product);

console.log(purchases);
