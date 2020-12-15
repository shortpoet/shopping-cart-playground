import { createConnection } from "typeorm";
import { SeedHandler } from "./SeedHandler";
const config = require('../../../ormconfig.js');
(async () => {
  const connection = await createConnection(config);
  const seedHandler = new SeedHandler(connection.createQueryRunner('master'));
  const entities = await seedHandler.getEntities();
  console.log(entities);
  
  const hasIdentity = [true, false, true, true]
  const order = ['PurchaseEntity', 'TransactionEntity', 'ProductEntity', 'CustomerEntity']
  await seedHandler.cleanAll(entities, hasIdentity, order);
  connection.close()
})();