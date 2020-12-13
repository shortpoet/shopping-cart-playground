import { CustomerEntity } from '../../api/entity/CustomerEntity'
import { Factory, Seeder } from 'typeorm-seeding'
import { TransactionEntity } from '../../api/entity/TransactionEntity';
import { ProductEntity } from '../../api/entity/ProductEntity';
import { PurchaseEntity } from '../../api/entity/PurchaseEntity';
import { random } from 'faker';
import { Connection } from 'typeorm';
import { EntityFactory } from 'typeorm-seeding/dist/entity-factory';

export class CreateCustomer implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(CustomerEntity)().createMany(3);
    // await factory(CustomerEntity)().createMany(300);
    await factory(ProductEntity)().createMany(36);
    const customers = await connection.getRepository(CustomerEntity).find();
    const products = await connection.getRepository(ProductEntity).find();
    const productIds = products.map(p => p.id);
    for (const customer of customers) {
      const purchases: PurchaseEntity[] = [];
      const purchaseFactories: EntityFactory<PurchaseEntity, unknown>[] = [];
      const { id: customerId } = customer;
      const transactionId = Date.now().toString();
      const purchaseNum = random.number({ min: 1, max: 8 });
      console.log('purchase num');
      console.log(purchaseNum);
      for (let i = 0; i <= purchaseNum; i++) {
        const purchaseFactory = await factory(PurchaseEntity)({
          productId: productIds[random.number({ min: 1, max: 36 })],
          transactionId: transactionId
        })
        purchaseFactories.push(purchaseFactory);
        purchases.push(await purchaseFactory.make());
      }
      const total: number = purchases.reduce((total, purchase) => total += purchase.product.cost * purchase.quantity, 0);
      //   A customer receives 2 points for every dollar spent over $100 in each transaction, plus 1 point for every dollar spent over $50 in each transaction
      // (e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points).
      const rewardsPoints =
        total > 50 && total <= 100
          ? (total - 50)
          : total > 100
            ? (50 + ((total - 100) * 2))
            : 0
        ;
      await factory(TransactionEntity)({
        customerId: customerId,
        transactionId: transactionId,
        total: total,
        rewardsPoints: rewardsPoints
      }).create();
      console.log(purchaseFactories.length);
      
      purchaseFactories.forEach(async f => await f.create())
    }

  }
}
