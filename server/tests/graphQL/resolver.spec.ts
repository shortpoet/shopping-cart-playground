import { Connection, createConnection, getRepository } from "typeorm";
import { graphql } from "graphql";
import { generateSchema } from "../../src/utils/generateSchema";
import { CustomerResolver } from "../../src/api/resolvers/customer.resolver";
import config from '../../ormconfig.js'
import { SeedHandler } from "../../src/orm/seeds/SeedHandler";
import path from "path";
import fs from "fs";
import { chalkLog } from "../../src/utils/chalkLog";
import { TransactionResolver } from "../../src/api/resolvers/transaction.resolver";

let connection: Connection;
let seedHandler: SeedHandler;
const transactionQuery = JSON.parse(fs.readFileSync(path.join(__dirname, `../fixtures/transactionQuery.json`), 'utf-8'));

const customerQuery = JSON.parse(fs.readFileSync(path.join(__dirname, `../fixtures/customerQuery.json`), 'utf-8'));

const flushPromises = () => new Promise((resolve)=> setImmediate(resolve));

beforeAll(async () => {
  // console.log({...config, database: 'playground_test'});
  
  // connection = await createConnection({ ...config, database: 'playground_test', name: 'test' });
  
  connection = await createConnection({ ...config, database: 'playground_test' });
  seedHandler = new SeedHandler(connection.createQueryRunner('master'));
  await seedHandler.reloadFixtures();
  await flushPromises();
});

afterAll(async () => {
  await seedHandler.closeConnection();
});

describe('customer.resolvers.ts', () => {
  test('customers query', async (done) => {
    // create new graphQL instance to use for test due to decorators such as @Info, @Field, etc.
    // need schema for graphQL instance
    chalkLog('yellow', 'starting test')

    const schema = await generateSchema(CustomerResolver);
    const actual = await graphql({
      schema,
      source: `
      {
        customers{
          id
          firstName
          lastName
          transactions{
            id
            customerId
            total
            rewardsPoints
            purchases {
              id
              productId
              transactionId
              quantity
              product{
                id
                productName
                cost
              }
            }
          }
        }
      }
    `
    });
    // console.log(customerQuery.map(c=> c.firstName));
    
    await expect(actual.data.customers).toEqual(customerQuery);
    await flushPromises();
    done();
  });
});


// different files kept breaking async
describe('transaction.resolvers.ts', () => {
  test('transaction query', async (done) => {
    // create new graphQL instance to use for test due to decorators such as @Info, @Field, etc.
    // need schema for graphQL instance
    chalkLog('yellow', 'starting test')
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
    // console.log(transactionQuery.map(t=> t.customerId));

    
    await expect(actual.data.transactions).toEqual(transactionQuery);
    await flushPromises();

    done();
  });
});