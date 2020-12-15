import { Connection, createConnection, getRepository } from "typeorm";
import { buildSchema } from "type-graphql";
import { graphql } from "graphql";
import { generateSchema } from "../../src/utils/generateSchema";
import { CustomerResolver } from "../../src/api/resolvers/customer.resolver";
import config from '../../ormconfig.js'
import { SeedHandler } from "../../src/orm/seeds/SeedHandler";
import path from "path";
import fs from "fs";
import { EntityNames } from "../../src/interfaces/EntityNames";
import { TransactionResolver } from "../../src/api/resolvers/transaction.resolver";
let connection: Connection;
let seedHandler: SeedHandler;

const customers = JSON.parse(fs.readFileSync(path.join(__dirname, `../fixtures/${EntityNames.CustomerEntity}.json`), 'utf-8'));
// const customerQuery = JSON.parse(fs.readFileSync(path.join(__dirname, `../fixtures/customerQuery.json`), 'utf-8'));
const products = JSON.parse(fs.readFileSync(path.join(__dirname, `../fixtures/${EntityNames.ProductEntity}.json`), 'utf-8'));
const purchases = JSON.parse(fs.readFileSync(path.join(__dirname, `../fixtures/${EntityNames.PurchaseEntity}.json`), 'utf-8'));
const transactions = JSON.parse(fs.readFileSync(path.join(__dirname, `../fixtures/${EntityNames.TransactionEntity}.json`), 'utf-8'));
// const transactionQuery = JSON.parse(fs.readFileSync(path.join(__dirname, `../fixtures/transactionQuery.json`), 'utf-8'));
console.log(customers);

beforeEach(async () => {
  // connection = await createConnection({...config, database: 'logistics_test'});
  connection = await createConnection(config);
  seedHandler = new SeedHandler(connection.createQueryRunner('master'));
  await seedHandler.reloadFixtures();
});

afterEach(async () => {
  await connection.close();
  await seedHandler.closeConnection();
});

describe('customer.resolvers.ts', () => {
  test('customers query', async () => {
    // create new graphQL instance to use for test due to decorators such as @Info, @Field, etc.
    // need schema for graphQL instance
    const schema = await generateSchema(TransactionResolver);
    const actual = await graphql({
      schema,
      source: `
      {
        transactions {
          id
          customerId
          total
          rewardsPoints
          customer {
            id
            firstName
            lastName
          }
          purchases {
            id
            productId
            transactionId
            quantity
            product {
              id
              productName
              cost
            }
          }
        }
      }
    `
    });
    console.log(actual);
    
    expect(actual.data).toEqual(undefined);
  });
});