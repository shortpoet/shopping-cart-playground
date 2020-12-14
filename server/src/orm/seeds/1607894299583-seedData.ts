import { CustomerEntity } from '../../api/entity/CustomerEntity'
import { TransactionEntity } from '../../api/entity/TransactionEntity';
import { ProductEntity } from '../../api/entity/ProductEntity';
import { PurchaseEntity } from '../../api/entity/PurchaseEntity';
import { keyword } from "chalk";
import faker from "faker";
import { createConnection, EntityTarget, getConnection, getRepository, MigrationInterface, ObjectType, QueryRunner, Repository } from "typeorm";
import { SeedHandler } from './SeedHandler';

export class seedData1607894299583 implements MigrationInterface {
  name?: string;


  async up(queryRunner: QueryRunner): Promise<any> {
    const seedHandler = new SeedHandler(queryRunner);
    
    await seedHandler.seedData()
    return;
  }
  
  
  async down(queryRunner: QueryRunner): Promise<any> {
    const seedHandler = new SeedHandler(queryRunner);
    const entities = await seedHandler.getEntities();
    const order = ['PurchaseEntity', 'TransactionEntity', 'ProductEntity', 'CustomerEntity',]
    await seedHandler.cleanAll(entities, order);
  }

}