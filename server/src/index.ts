import express, { Express } from 'express';
import cors from 'cors';
import { createConnection, getConnection } from "typeorm";
import { graphqlHTTP }from 'express-graphql';
import { generateSchema } from "./utils/generateSchema";
import { loggingMiddleware } from './middleware/loggingMiddleware';
import { redisMiddleware } from './middleware/redisMiddleware';
import { TransactionEntity } from './api/entity/TransactionEntity';
import { TransactionResolver } from './api/resolvers/transaction.resolver';
import { seedMiddleware } from './middleware/seedMiddleware';
import { SeedHandler } from './orm/seeds/SeedHandler';
// const util = require('util');
// import util from 'util';


const config = require('../ormconfig.js');

// export default class Application {
//   app: Express
// }

(async () => {
  // console.log(config);
  // could insert config as options into createConnection 
  // if need to read from.env to have node modules up a directory 
  const connection = await createConnection(config);
  const context = await getConnection();
  const tranactionContext = await context.getRepository(TransactionEntity).find()
  // console.log(tranactionContext);
  
  if (connection) {
    // console.log(util.inspect(connection.options, false, null, true /* enable colors */));
    const app = express();
    app.use(cors());
    
    if (process.env.DOCKER && process.env.REDIS_CACHE_DISABLE != 'true') {
      app.use(redisMiddleware);
    }

    app.use(loggingMiddleware);

    const schema = await generateSchema(TransactionResolver);

    app.use(seedMiddleware);

    // if ((await context.getRepository(TransactionEntity).find()).length == 0) {
    //   const seedHandler = new SeedHandler(getConnection().createQueryRunner('master'));
    //   await seedHandler.seedData()
    // }


    app.use('/graphql', seedMiddleware, graphqlHTTP((req) => ({
      schema,
      graphiql: true
    })))

    app.listen(process.env.APP_PORT || 5000)
  }
})();