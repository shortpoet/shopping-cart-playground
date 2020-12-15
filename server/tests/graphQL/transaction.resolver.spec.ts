import { Connection, createConnection, getRepository } from "typeorm";
import { graphql } from "graphql";
import { generateSchema } from "../../src/utils/generateSchema";
import config from '../../ormconfig.js'
import { SeedHandler } from "../../src/orm/seeds/SeedHandler";
import path from "path";
import fs from "fs";
import { TransactionResolver } from "../../src/api/resolvers/transaction.resolver";
let connection: Connection;
let seedHandler: SeedHandler;

const transactionQuery = JSON.parse(fs.readFileSync(path.join(__dirname, `../fixtures/transactionQuery.json`), 'utf-8'));

beforeEach(async () => {
  connection = await createConnection({...config, database: 'playground_test'});
  seedHandler = new SeedHandler(connection.createQueryRunner('master'));
  await seedHandler.reloadFixtures();
});

afterEach(async () => {
  await connection.close();
  await seedHandler.closeConnection();
});

describe('transaction.resolvers.ts', () => {
  test('transaction query', async () => {
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
    
    expect(actual.data.transactions).toEqual(transactionQuery);
  });
});