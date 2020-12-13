import { BuildSchemaOptions, buildSchema } from "type-graphql";
import { GraphQLSchema } from "graphql";
// const path = require('path');
import path from 'path';
export async function generateSchema(
  ...resolvers: BuildSchemaOptions['resolvers']
): Promise<GraphQLSchema> {
  try {
    return await buildSchema({
      resolvers: resolvers,
      emitSchemaFile: path.resolve(__dirname, "schema.gql")
    })
  } catch (error) {
    console.log(`There was an error generating schema. Error was: ${error}`);
    throw error;
  }
}