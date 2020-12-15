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
let connection: Connection;
let seedHandler: SeedHandler;

const customers = JSON.parse(fs.readFileSync(path.join(__dirname, `../fixtures/${EntityNames.CustomerEntity}.json`), 'utf-8'));
const products = JSON.parse(fs.readFileSync(path.join(__dirname, `../fixtures/${EntityNames.ProductEntity}.json`), 'utf-8'));
const purchases = JSON.parse(fs.readFileSync(path.join(__dirname, `../fixtures/${EntityNames.PurchaseEntity}.json`), 'utf-8'));
const transactions = JSON.parse(fs.readFileSync(path.join(__dirname, `../fixtures/${EntityNames.TransactionEntity}.json`), 'utf-8'));
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
    const USERNAME = 'CoolGuy7';
    const PASSWORD = 'secret';
    const TITLE = 'My Cool Post'
    // const user = await createUser(<User>{ username: USERNAME, password: PASSWORD });
    // const post = await createPost({ title: TITLE}, user);
    // const expected =
    // {
    //   customers: [{
    //     id: user.id.toString(),
    //     username: USERNAME,
    //     password: PASSWORD,
    //     posts: [
    //       {
    //         id: post.id.toString(),
    //         userId: user.id,
    //         title: TITLE,
    //         created: post.created.toISOString(),
    //         html: null,
    //         markdown: null,
    //       }
    //     ]
    //   }]
    // };
    // // create new graphQL instance to use for test due to decorators such as @Info, @Field, etc.
    // // need schema for graphQL instance
    // const schema = await generateSchema(UserResolver);
    // const actual = await graphql({
    //   schema,
    //   source: `
    //     {
    //       users{
    //         id
    //         username
    //         password
    //         posts{
    //           id
    //           title
    //           markdown
    //           html
    //           created
    //           userId
    //         }
    //       }
    //     }
    //   `
    // });
    // // console.log((JSON.stringify(actual.data)));
    // // console.log((JSON.stringify(expected)));

    // expect(actual.data).toEqual(expected);
  });
});