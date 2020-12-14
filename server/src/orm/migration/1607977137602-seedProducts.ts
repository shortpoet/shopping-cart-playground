import {MigrationInterface, QueryRunner} from "typeorm";
import { SeedHandler } from "../seeds/SeedHandler";

export class seedProducts1607977137602 implements MigrationInterface {

  async up(queryRunner: QueryRunner): Promise<any> {
    const seedHandler = new SeedHandler(queryRunner);
    
    await seedHandler.seedProducts()
    return;
  }
  
  
  async down(queryRunner: QueryRunner): Promise<any> {
    const seedHandler = new SeedHandler(queryRunner);
    // const entities = await seedHandler.getEntities();
    // const order = ['PurchaseEntity', 'TransactionEntity', 'ProductEntity', 'CustomerEntity',]
    // await seedHandler.cleanAll(entities, order);
    await seedHandler.clean('ProductEntity');
  }

}
