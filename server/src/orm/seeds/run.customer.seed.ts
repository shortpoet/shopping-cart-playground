import { runSeeder, useSeeding } from "typeorm-seeding";
import { CreateCustomer } from "./customer.seed";
const run = 
  async () => {
    await useSeeding();
    await runSeeder(CreateCustomer);
  }
run();
