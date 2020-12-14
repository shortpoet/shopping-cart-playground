import { CustomerEntity } from "@src/api/entity/CustomerEntity";
import { ProductEntity } from "@src/api/entity/ProductEntity";
import { PurchaseEntity } from "@src/api/entity/PurchaseEntity";
import { TransactionEntity } from "@src/api/entity/TransactionEntity";
import { keyword } from "chalk";
import faker from "faker";
import { getRepository, MigrationInterface, QueryRunner } from "typeorm";


function forEachPromise(items, fn) {
  return items.reduce((promise, item) => promise.then(() => fn(item)), Promise.resolve);
}

export class SeedData implements MigrationInterface {
  name?: string;
  customers: CustomerEntity[];

  async createCustomer() { 
    const gender = faker.random.number(1)
    const firstName = faker.name.firstName(gender)
    const lastName = faker.name.lastName(gender)
    const customer = new CustomerEntity()
    customer.firstName = firstName;
    customer.lastName = lastName;
    return await getRepository(CustomerEntity).save(customer);
  }
  
  async createProduct() { 
    const product = new ProductEntity();
    product.productName = faker.commerce.productName();
    // 1/3 of products above 100
    product.cost = faker.random.number(2) == 0
      ? +faker.commerce.price(10, 99, 2)
      : +faker.commerce.price(1, 10, 2)
      return await getRepository(ProductEntity).save(product);
  
  }
  
  async createPurchase(context) { 
    const { productId, transactionId, quantity } = context;
    const purchase = new PurchaseEntity();
    // purchase.product = factory(ProductEntity)() as any;
    purchase.productId = productId;
    purchase.transactionId = transactionId;
    purchase.quantity = quantity;
    return await getRepository(PurchaseEntity).save(purchase);
  }
  
  async createTransaction(context) { 
    const { customerId, transactionId, total, rewardsPoints } = context;
    const transaction = new TransactionEntity();
    transaction.id = transactionId;
    transaction.customerId = customerId;
    transaction.total = total;
    transaction.rewardsPoints = rewardsPoints;
    return await getRepository(TransactionEntity).save(transaction);
  
  }
  
  up(queryRunner: QueryRunner): Promise<any> {
    const customerCount = 3;
    return forEachPromise([...Array(customerCount).keys()], this.createCustomer);

  }
  down(queryRunner: QueryRunner): Promise<any> {
    throw new Error("Method not implemented.");
  }

}