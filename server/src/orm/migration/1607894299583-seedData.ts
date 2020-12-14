import { CustomerEntity } from '../../api/entity/CustomerEntity'
import { TransactionEntity } from '../../api/entity/TransactionEntity';
import { ProductEntity } from '../../api/entity/ProductEntity';
import { PurchaseEntity } from '../../api/entity/PurchaseEntity';
import { keyword } from "chalk";
import faker from "faker";
import { createConnection, EntityTarget, getConnection, getRepository, MigrationInterface, ObjectType, QueryRunner, Repository } from "typeorm";


function forEachPromise(items, fn) {
  return items.reduce((promise, item) => promise().then(() => fn(item)), Promise.resolve);
}

interface iShopEntity {
  entity: ObjectType<PurchaseEntity | ProductEntity | TransactionEntity | CustomerEntity>;
}

type ShopEntity = PurchaseEntity | ProductEntity | TransactionEntity | CustomerEntity

// class ShopEntity implements iShopEntity {
//   constructor
// }
interface GenericInterface<T> {
  new(something: any): T;
}
// class Creator<T extends {getRepository<Entity>(entityClass: EntityTarget<Entity>, connectionName?: string): Repository<Entity>}> {
// class Creator<T extends ObjectType<T>> {

const handleConnection = async () => {
  let connection = await getConnection();
  if (connection == undefined) {
    try {
      connection = await getConnection()
    } catch (_) { }
    if (connection == undefined) {
      connection = await createConnection()
    }

  }
  return connection
}

class SeedHandler<T> {
  public constructor(private c: { new(): T }) { }
  async create<T extends ShopEntity>(entities): Promise<Array<Promise<T>>> {
    let connection = await handleConnection();
    return entities.map(async (entity: T) => {
      try {
        const repo = await connection.getRepository(this.c);
        const created = await repo.create(entity as any);
        await repo.save(created as any)
      } catch (error) {
        await handleConnection();
      }
    });
  }
  // create<T extends EntityTarget<T>>(entities): Array<Promise<T>> {
  async create2<T extends ShopEntity>(entities): Promise<Array<Promise<T>>> {
    return new Promise((resolve, reject) => {
      return entities.map(async (entity: T) => {
        const repo = await getRepository(this.c);
        return repo
          .findOne(entity.id)
          .then(async dbMessage => {
            // We check if a language already exists.
            // If it does don't create a new one.
            if (dbMessage) {
              return Promise.resolve(null);
            }
            const created = await repo.create(entity as any);
            return Promise.resolve(
              await repo.save(created as any)
            );
          })
          .catch(error => Promise.reject(error));
      });
    })
  }
  async destroy<T extends ShopEntity>(entities): Promise<Array<Promise<T>>> {
    return new Promise((resolve, reject) => {
      return entities.map(async (entity: T) => {
        const repo = await getRepository(this.c);
        return repo
          .findOne(entity.id)
          .then(async dbMessage => {
            // We check if a language already exists.
            // If it does don't create a new one.
            if (dbMessage) {
              return Promise.resolve(null);
            }
            const created = await repo.create(entity as any);
            return Promise.resolve(
              await repo.save(created as any)
            );
          })
          .catch(error => Promise.reject(error));
      });
    })
  }

}

export class seedData1607894299583 implements MigrationInterface {
  name?: string;
  customers: CustomerEntity[];

  createCustomer() {
    const gender = faker.random.number(1)
    const firstName = faker.name.firstName(gender)
    const lastName = faker.name.lastName(gender)
    const customer = new CustomerEntity()
    customer.firstName = firstName;
    customer.lastName = lastName;
    console.log(customer);

    return customer;
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

  looper(amount, fn) {
    const out = [];
    for (let i = 0; i < amount; i++) {
      out.push(fn())
    }
    return out;
  }

  async findAll() {

  }
  async getEntities() {
    const entities = [];
    (await (await getConnection()).entityMetadatas).forEach(
      x => entities.push({ name: x.name, tableName: x.tableName })
    );
    return entities;
  }

  async cleanAll(entities) {
    try {
      for (const entity of entities) {
        const repository = await getRepository(entity.name);
        await repository.query(`DELETE FROM ${entity.tableName};`);
      }
    } catch (error) {
      throw new Error(`ERROR: Cleaning test db: ${error}`);
    }
  }

  async up(queryRunner: QueryRunner): Promise<any> {
    const customerCount = 3;
    const customerCreate = new SeedHandler<CustomerEntity>(CustomerEntity)
    const customers = this.looper(customerCount, this.createCustomer)
    console.log(customers);
    return await customerCreate.create(customers);

    // return forEachPromise([...Array(customerCount).keys()], this.createCustomer);

  }


  async down(queryRunner: QueryRunner): Promise<any> {
    const entities = await this.getEntities();
    await this.cleanAll(entities);
  }

}