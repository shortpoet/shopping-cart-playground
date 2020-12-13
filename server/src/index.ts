import express, { Express } from 'express';
import cors from 'cors';
import { createConnection, getConnection } from "typeorm";
import { graphqlHTTP }from 'express-graphql';
import { generateSchema } from "./utils/generateSchema";
import { loggingMiddleware } from './middleware/loggingMiddleware';
import { redisMiddleware } from './middleware/redisMiddleware';
import { TransactionEntity } from './api/entity/TransactionEntity';
import { TransactionResolver } from './api/resolvers/transaction.resolver';
// const util = require('util');
// import util from 'util';


// const config = require('../ormconfig.js');

// export default class Application {
//   app: Express
// }

(async () => {
  // console.log(config);
  // could insert config as options into createConnection 
  // if need to read from.env to have node modules up a directory 
  const connection = await createConnection();
  const context = await getConnection().getRepository(TransactionEntity).find()
  console.log(context);
  
  if (connection) {
    // console.log(util.inspect(connection.options, false, null, true /* enable colors */));
    const app = express();
    app.use(cors());
    
    if (process.env.DOCKER && process.env.REDIS_CACHE_DISABLE != 'true') {
      app.use(redisMiddleware);
    }

    app.use(loggingMiddleware);

    const schema = await generateSchema(TransactionResolver);

    app.use('/graphql', graphqlHTTP((req) => ({
      schema,
      graphiql: true
    })))

    app.listen(process.env.APP_PORT || 5000)
  }
})();