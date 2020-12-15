import { Connection, createConnection, getRepository } from "typeorm";
import { buildSchema } from "type-graphql";
import { graphql } from "graphql";
import { createUser } from "../factories/users";
import { User } from "../../src/entity/User";
import { createPost } from "../factories/posts";
import { generateSchema } from "../../src/utils/generateSchema";
import { UserResolver } from "../../src/resolvers/user.resolver";
import config from '../../ormconfig.js'
let connection: Connection;

beforeEach(async () => {
  connection = await createConnection({...config, database: 'vcc_test'});
  const repo = getRepository(User);
  await repo.remove(await repo.find());
});

afterEach(async () => {
  await connection.close();
});

describe('project.resolvers.ts', () => {
  test('user query', async () => {
    const USERNAME = 'CoolGuy7';
    const PASSWORD = 'secret';
    const TITLE = 'My Cool Post'
    const user = await createUser(<User>{ username: USERNAME, password: PASSWORD });
    const post = await createPost({ title: TITLE}, user);
    const expected = {
      user: {
        id: user.id.toString(),
        username: USERNAME,
        password: PASSWORD,
        posts: [
          {
            id: post.id.toString(),
            userId: user.id,
            title: TITLE,
            created: post.created.toISOString(),
            html: null,
            markdown: null,
          }
        ]
      }
    };
    // create new graphQL instance to use for test due to decorators such as @Info, @Field, etc.
    // need schema for graphQL instance
    const schema = await generateSchema(UserResolver);
    const actual = await graphql({
      schema,
      source: `
        {
          user(id: ${user.id}){
            id
            username
            password
            posts{
              id
              title
              markdown
              html
              created
              userId
            }
          }
        }
      `
    });
    // console.log((JSON.stringify(actual.data)));
    // console.log((JSON.stringify(expected)));

    expect(actual.data).toEqual(expected);
  });
  test('users query', async () => {
    const USERNAME = 'CoolGuy7';
    const PASSWORD = 'secret';
    const TITLE = 'My Cool Post'
    const user = await createUser(<User>{ username: USERNAME, password: PASSWORD });
    const post = await createPost({ title: TITLE}, user);
    const expected = {
      users: [{
        id: user.id.toString(),
        username: USERNAME,
        password: PASSWORD,
        posts: [
          {
            id: post.id.toString(),
            userId: user.id,
            title: TITLE,
            created: post.created.toISOString(),
            html: null,
            markdown: null,
          }
        ]
      }]
    };
    // create new graphQL instance to use for test due to decorators such as @Info, @Field, etc.
    // need schema for graphQL instance
    const schema = await generateSchema(UserResolver);
    const actual = await graphql({
      schema,
      source: `
        {
          users{
            id
            username
            password
            posts{
              id
              title
              markdown
              html
              created
              userId
            }
          }
        }
      `
    });
    // console.log((JSON.stringify(actual.data)));
    // console.log((JSON.stringify(expected)));

    expect(actual.data).toEqual(expected);
  });
});