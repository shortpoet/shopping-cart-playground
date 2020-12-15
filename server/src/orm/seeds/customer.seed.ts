import { Factory, Seeder } from 'typeorm-seeding'
import { CustomerEntity } from '../../api/entity/CustomerEntity'
import { TransactionEntity } from '../../api/entity/TransactionEntity';
import { ProductEntity } from '../../api/entity/ProductEntity';
import { PurchaseEntity } from '../../api/entity/PurchaseEntity';
import { random } from 'faker';
import { Connection } from 'typeorm';
import { EntityFactory } from 'typeorm-seeding/dist/entity-factory';



export class CreateCustomer implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {

  }
}
