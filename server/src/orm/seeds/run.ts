import { chalkLog } from "../../utils/chalkLog";
import { createConnection } from "typeorm";
import { SeedHandler } from "./SeedHandler";
const config = require('../../../ormconfig.js');
(async () => {
  try {
    const connection = await createConnection(config);
    const seedHandler = new SeedHandler(connection.createQueryRunner('master'));
    await seedHandler.seedData();
    connection.close();
    chalkLog("magenta", "...entities seeded");
  } catch (error) {
    chalkLog("red", `... error seeding ${error}`);
  }
})();