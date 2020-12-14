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

interface PurchaseContext {
  product: ProductEntity;
  transactionId: TransactionEntity['id'];
  quantity: PurchaseEntity['quantity'];
}
interface TransactionContext {
  customerId: CustomerEntity['id'];
  transactionId: TransactionEntity['id'];
  total: TransactionEntity['total'];
  rewardsPoints: TransactionEntity['rewardsPoints'];
}

class SeedHandler<T> {
  private queryRunner: QueryRunner;
  public constructor(private c: { new(): T }, queryRunner) {
    this.queryRunner = queryRunner;
  }
  async create<T extends ShopEntity>(entities): Promise<Array<Promise<T>>> {
    // let connection = await handleConnection();
    return entities.map(async (entity: T) => {
      console.log(entity);
      try {
        const repo = await this.queryRunner.connection.getRepository(this.c);
        // const created = await repo.create(entity as any);
        return await repo.save(entity as any)
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
    return customer;
  }

  createProduct() {
    const product = new ProductEntity();
    product.productName = faker.commerce.productName();
    // 1/3 of products above 100
    product.cost = faker.random.number(2) == 0
      ? +faker.commerce.price(10, 99, 2)
      : +faker.commerce.price(1, 10, 2)
    return product;

  }

  createPurchase(context: PurchaseContext) {
    const { product, transactionId, quantity } = context;
    const purchase = new PurchaseEntity();
    purchase.product = product;
    purchase.productId = product.id;
    purchase.transactionId = transactionId;
    purchase.quantity = quantity;
    return purchase;
  }

  createTransaction(context: TransactionContext) {
    const { customerId, transactionId, total, rewardsPoints } = context;
    const transaction = new TransactionEntity();
    transaction.id = transactionId;
    transaction.customerId = customerId;
    transaction.total = total;
    transaction.rewardsPoints = rewardsPoints;
    return transaction;

  }

  looper(amount, fn, context?) {
    const out = [];
    for (let i = 0; i < amount; i++) {
      out.push(fn(context))
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

  calculateTransaction(purchases) {
    const total: number = purchases.reduce((total, purchase) => total += purchase.product.cost * purchase.quantity, 0);
    //   A customer receives 2 points for every dollar spent over $100 in each transaction, plus 1 point for every dollar spent over $50 in each transaction
    // (e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points).
    const rewardsPoints =
      total > 50 && total <= 100
        ? (total - 50)
        : total > 100
          ? (50 + ((total - 100) * 2))
          : 0
      ;
    return {
      total: total,
      rewardsPoints: rewardsPoints
    }
  }

  async up(queryRunner: QueryRunner): Promise<any> {
    const customerCount = 3;
    const customerCreate = new SeedHandler<CustomerEntity>(CustomerEntity, queryRunner)
    const customers: CustomerEntity[] = this.looper(customerCount, this.createCustomer);
    // console.log(customers);
    const customerPromises = await customerCreate.create(customers);
    await Promise.all(customerPromises);

    const productCount = 3;
    const productCreate = new SeedHandler<ProductEntity>(ProductEntity, queryRunner);
    const products = this.looper(productCount, this.createProduct);
    // console.log(products);
    const productPromises = await productCreate.create(products);
    await Promise.all(productPromises);
    const createdProducts = await queryRunner.connection.getRepository(ProductEntity).find();
    console.log(createdProducts);
    
    const debug = true 
    if (debug) {
      for (const customer of customers) {
        const transactionId = Date.now().toString();
        const purchaseCount = faker.random.number({ min: 1, max: 8 });
        const purchaseCreate = new SeedHandler<PurchaseEntity>(PurchaseEntity, queryRunner);
        const check = createdProducts.filter((p: ProductEntity) => p.id == faker.random.number({ min: 1, max: 3 }));
        console.log(check);
        
        const product = createdProducts.filter((p: ProductEntity) => p.id == faker.random.number({ min: 1, max: 3 }))[0];
        console.log(product);
        const purchaseContext: PurchaseContext = {
          product: product,
          quantity: faker.random.number({ min: 1, max: 5 }),
          transactionId: transactionId
        };
        const purchases = this.looper(purchaseCount, this.createPurchase, purchaseContext);
        const transactionCreate = new SeedHandler<TransactionEntity>(TransactionEntity, queryRunner);
        const transactionCount = 1;
        const { total, rewardsPoints } = this.calculateTransaction(purchases);
        const transactionContext: TransactionContext = {
          transactionId: transactionId,
          customerId: customer.id,
          total: total,
          rewardsPoints: rewardsPoints
        };
        const transactions = this.looper(transactionCount, this.createTransaction, transactionContext);
        const transactionPromises = await transactionCreate.create(transactions);
        await Promise.all(transactionPromises);
        const purchasePromises = await purchaseCreate.create(purchases);
        await Promise.all(purchasePromises);
      }
    }

    return;
  }


  async down(queryRunner: QueryRunner): Promise<any> {
    const entities = await this.getEntities();
    await this.cleanAll(entities);
  }

}