import { Connection, createConnection, getRepository } from "typeorm";
import { graphql } from "graphql";
import { generateSchema } from "../../src/utils/generateSchema";
import { CustomerResolver } from "../../src/api/resolvers/customer.resolver";
import config from '../../ormconfig.js'
import { SeedHandler } from "../../src/orm/seeds/SeedHandler";
import path from "path";
import fs from "fs";
let connection: Connection;
let seedHandler: SeedHandler;

const customerQuery = JSON.parse(fs.readFileSync(path.join(__dirname, `../fixtures/customerQuery.json`), 'utf-8'));

beforeEach(async () => {
  connection = await createConnection({...config, database: 'playground_test'});
  seedHandler = new SeedHandler(connection.createQueryRunner('master'));
  await seedHandler.reloadFixtures();
});

afterEach(async () => {
  await seedHandler.closeConnection();
});

describe('customer.resolvers.ts', () => {
  test('customers query', async () => {
    // create new graphQL instance to use for test due to decorators such as @Info, @Field, etc.
    // need schema for graphQL instance
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

    await expect(actual.data.customers).toEqual(customerQuery);
  });
});