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
    console.log(productIds);
    customers.forEach(async (customer: CustomerEntity) => {
      const purchases: PurchaseEntity[] = [];
      const { id: customerId } = customer;
      const transactionId = Date.now().toString();
      const purchaseNum = random.number({ min: 1, max: 8 });
      console.log('purchase num');
      console.log(purchaseNum);
      for (let i = 1; i <= purchaseNum; i++) {
        const p = new PurchaseEntity();
        const randomId = random.number({ min: 1, max: 36 });
        console.log(randomId);
        
        p.product = products.filter((p: ProductEntity) => p.id == randomId)[0];
        p.productId = randomId;
        p.quantity = random.number({ min: 1, max: 5 });
        p.transactionId = transactionId;
        purchases.push(p);
      };  
      console.log(purchases);
      
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
      console.log(purchases.length);
      // await factory(PurchaseEntity)({productId: purchases[0].product.id, quantity: purchases[0].quantity, transactionId: purchases[0].transactionId})
      //   .map(async (purchase: PurchaseEntity) => 
      //     await factory(PurchaseEntity)({
      //       productId: purchase.productId, quantity: purchase.quantity, transactionId: purchase.transactionId
      //     }).make()
      //   )
      //   .createMany(purchases.length)
        // .createMany(purchases.length, {productId: purchases[0].product.id, quantity: purchases[0].quantity, transactionId: purchases[0].transactionId})
      purchases.forEach(async(f: PurchaseEntity) =>
        await factory(PurchaseEntity)({productId: f.productId, quantity: f.quantity, transactionId: f.transactionId}).create()
      )

    });

  }
}
