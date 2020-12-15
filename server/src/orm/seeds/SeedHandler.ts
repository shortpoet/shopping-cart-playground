import { CustomerEntity } from '../../api/entity/CustomerEntity'
import { TransactionEntity } from '../../api/entity/TransactionEntity';
import { ProductEntity } from '../../api/entity/ProductEntity';
import { PurchaseEntity } from '../../api/entity/PurchaseEntity';
import { keyword } from "chalk";
import * as faker from "faker";
import { createConnection, EntityTarget, getConnection, getRepository, MigrationInterface, ObjectType, QueryRunner, Repository } from "typeorm";
import { createDbConnection } from './dbConnect';
import * as path from 'path';
import * as fs from 'fs';
import { EntityNames } from '../../interfaces/EntityNames';
import { customerQuery } from '../../api/resolvers/customer.resolver'
import { transactionQuery } from '../../api/resolvers/transaction.resolver';
import { chalkLog } from '../../utils/chalkLog';
function forEachPromise(items, fn) {
  return items.reduce((promise, item) => promise().then(() => fn(item)), Promise.resolve);
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

// interface iShopEntity {
//   entity: ObjectType<PurchaseEntity | ProductEntity | TransactionEntity | CustomerEntity>;
// }

interface PurchaseContext {
  // product: ProductEntity;
  transactionId: TransactionEntity['id'];
  quantity: PurchaseEntity['quantity'];
}
interface TransactionContext {
  customerId: CustomerEntity['id'];
  transactionId: TransactionEntity['id'];
  total: TransactionEntity['total'];
  rewardsPoints: TransactionEntity['rewardsPoints'];
}

class EntityFactory<T> {
  private queryRunner: QueryRunner;
  public constructor(private c: { new(): T }, queryRunner) {
    this.queryRunner = queryRunner;
  }
  async create<T extends ShopEntity>(entities): Promise<Array<Promise<T>>> {
    let connection = await this.queryRunner.connection;
    return entities.map(async (entity: T) => {
      console.log(entity);
      try {
        // const connection = await this.queryRunner.connect();
        // console.log(connection);
        const repo = await connection.getRepository(this.c);
        // const created = await repo.create(entity as any);
        return await repo.save(entity as any)
      } catch (error) {
        console.log(`error saving entity ${entity}`);
      }
    });
  }
}

export class SeedHandler {
  savedCustomers: CustomerEntity[];
  savedProducts: ProductEntity[];
  private queryRunner: QueryRunner;
  public constructor(queryRunner) {
    this.queryRunner = queryRunner;
  }
  closeConnection = async () => {
    const connection = (await this.queryRunner.connection);
    if (connection.isConnected) {
      await (await this.queryRunner.connection).close();
    }
  }
  looper = (amount, fn, context?) => {
    const out = [];
    for (let i = 0; i < amount; i++) {
      out.push(fn(context))
    }
    return out;
  }
  findAll = async () => {

  }
  getEntities = async () => {
    const entities = [];
    (await (await getConnection()).entityMetadatas).forEach(
      x => entities.push({ name: x.name, tableName: x.tableName })
    );
    return entities;
  }
  clean = async (name, hasIdentity = true) => {

    const entity = await (await this.getEntities()).filter(e => e.name == name)[0];
    try {
      const repository = await getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName};`);
      if (hasIdentity) await repository.query(`DBCC CHECKIDENT ('${entity.tableName}', RESEED, 0);`);
    } catch (error) {
      throw new Error(`ERROR: Cleaning test db: ${error}`);
    }

  }
  reOrder = (entities, order) => entities = entities.map((item, i) => entities.filter((thisItem => thisItem.name == order[i]))[0]);
  
  cleanAll = async (entities, hasIdentity, order?) => {
    let count = 0;
    if (order) {
      entities = this.reOrder(entities, order)
    }
    try {
      for (const entity of entities) {
        await this.clean(entity.name, hasIdentity[count]);
        count++;
      }
      chalkLog('green', 'entites cleaned')
    } catch (error) {
      throw new Error(`ERROR: Cleaning test db: ${error}`);
    }
  }
  /**
   * Insert the data from the src/test/fixtures folder
   */
  loadAll = async (entities) => {
    try {
      let connection = await this.queryRunner.connection;
      let count = 0;
      entities = this.reOrder(entities, ['PurchaseEntity', 'TransactionEntity', 'ProductEntity', 'CustomerEntity'].reverse())
  
      for (const entity of entities) {
        const repository = await connection.getRepository(entity.name);
        const fixtureFile = path.join(__dirname, `../../../tests/fixtures/${entity.name}.json`);
        if (fs.existsSync(fixtureFile)) {
          const items = JSON.parse(fs.readFileSync(fixtureFile, 'utf8'));
          console.log(items);

          await repository
            .createQueryBuilder(entity.name)
            .insert()
            .values(items)
            .execute();
        }
      }
      chalkLog('green', 'entites loaded')
    } catch (error) {
      throw new Error(`ERROR [SeedHandler.loadAll()]: Loading fixtures on test db: ${error}`);
    }
  }

  writeAll = async (entities) => {
    const queries = [
      {
        entity: EntityNames.CustomerEntity,
        query: customerQuery,
      },
      {
        entity: EntityNames.TransactionEntity,
        query: transactionQuery,
      }
    ]    
    try {
      let connection = await this.queryRunner.connection;

      for (const entity of entities) {
        const repository = await connection.getRepository(entity.name);
        const fixtureFile = path.join(__dirname, `../../../tests/fixtures/${entity.name}.json`);
        if (!fs.existsSync(fixtureFile)) {
          const items = JSON.stringify(
            await repository.find(),
            // await repository.query(`SELECT * FROM ${entity.tableName}`),
            undefined,
            2
          )
          fs.writeFileSync(fixtureFile, items);
        }
      }
      for (const query of queries) {
        // const repository = await connection.getRepository(query.entity);
        const fixtureFile = path.join(__dirname, `../../../tests/fixtures/${query.query.name}.json`);
        if (!fs.existsSync(fixtureFile)) {
          const items = JSON.stringify(
            await query.query(query.entity),
            undefined,
            2
          );
          fs.writeFileSync(fixtureFile, items);
        }
      }
    } catch (error) {
      throw new Error(`ERROR [SeedHandler.writeAll()]: Writing fixtures from test db: ${error}`);
    }
  }
  /**
   * Cleans the database and reloads the entries
   */
  async reloadFixtures() {
    const entities = await this.getEntities();
    console.log(entities);

    const hasIdentity = [true, false, true, true]
    const order = ['PurchaseEntity', 'TransactionEntity', 'ProductEntity', 'CustomerEntity']
    await this.cleanAll(entities, hasIdentity, order);
    await this.loadAll(entities);
  }
  createCustomer = () => {
    const gender = faker.random.number(1)
    const firstName = faker.name.firstName(gender)
    const lastName = faker.name.lastName(gender)
    const customer = new CustomerEntity()
    customer.firstName = firstName;
    customer.lastName = lastName;
    return customer;
  }
  createProduct = () => {
    const product = new ProductEntity();
    product.productName = faker.commerce.productName();
    // 1/3 of products above 100
    product.cost = faker.random.number(2) == 0
      ? +faker.commerce.price(10, 99, 2)
      : +faker.commerce.price(1, 10, 2)
    return product;
  }
  createPurchase = (context: PurchaseContext) => {
    const productIds = this.savedProducts.map(p => p.id);
    // console.log(productIds);
    const randomId = faker.random.number({ min: productIds[0], max: productIds.slice(-1)[0] });
    // console.log(randomId);
    const check = this.savedProducts.filter((p: ProductEntity) => p.id == randomId);
    // console.log('check');
    // console.log(check);
    const product = this.savedProducts.filter((p: ProductEntity) => p.id == randomId)[0];
    // console.log(product);
    const { transactionId, quantity } = context;
    const purchase = new PurchaseEntity();
    purchase.product = product;
    purchase.productId = product.id;
    purchase.transactionId = transactionId;
    purchase.quantity = quantity;
    return purchase;
  }
  createTransaction = (context: TransactionContext) => {
    const { customerId, transactionId, total, rewardsPoints } = context;
    const transaction = new TransactionEntity();
    transaction.id = transactionId;
    transaction.customerId = customerId;
    transaction.total = total;
    transaction.rewardsPoints = rewardsPoints;
    return transaction;
  }
  calculateTransaction = (purchases) => {
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
  seedCustomers = async () => {
    const customerCount = 3;
    const customerCreate = new EntityFactory<CustomerEntity>(CustomerEntity, this.queryRunner)
    const customers: CustomerEntity[] = this.looper(customerCount, this.createCustomer);
    // console.log(customers);
    const customerPromises = await customerCreate.create(customers);
    await Promise.all(customerPromises);
    return customers;
  }
  seedProducts = async () => {
    const productCount = 36;
    const productCreate = new EntityFactory<ProductEntity>(ProductEntity, this.queryRunner);
    const products = this.looper(productCount, this.createProduct);
    // console.log(products);
    const productPromises = await productCreate.create(products);
    await Promise.all(productPromises);
    return products;
  }
  seedTransaction = async (customer: CustomerEntity) => {
    const transactionId = Date.now().toString();
    const PURCHASE_COUNT = this.savedProducts.length >= 8
      ? 8
      : this.savedProducts.length;
    const purchaseCount = faker.random.number({ min: 1, max: PURCHASE_COUNT });
    const purchaseCreate = new EntityFactory<PurchaseEntity>(PurchaseEntity, this.queryRunner);
    const PRODUCT_QUANTITY = this.savedProducts.length >= 5
      ? 5
      : this.savedProducts.length;
    const purchaseContext: PurchaseContext = {
      // product: product,
      quantity: faker.random.number({ min: 1, max: PRODUCT_QUANTITY }),
      transactionId: transactionId
    };
    console.log('seed trans');
    const purchases = this.looper(purchaseCount, this.createPurchase, purchaseContext);
    const transactionCreate = new EntityFactory<TransactionEntity>(TransactionEntity, this.queryRunner);
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
  seedTransactions = async () => {
    this.savedCustomers = await this.queryRunner.connection.getRepository(CustomerEntity).find();
    this.savedProducts = await this.queryRunner.connection.getRepository(ProductEntity).find();
    for (const customer of this.savedCustomers) {
      await this.seedTransaction(customer);
    }
  }
  seedData = async () => {
    await this.seedCustomers();
    await this.seedProducts();
    await this.seedTransactions();
  }
}
