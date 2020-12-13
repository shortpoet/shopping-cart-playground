import { CustomerEntity } from '../../api/entity/CustomerEntity'
import { Factory, Seeder } from 'typeorm-seeding'
import { TransactionEntity } from '../../api/entity/TransactionEntity';
import { ProductEntity } from '../../api/entity/ProductEntity';
import { PurchaseEntity } from '../../api/entity/PurchaseEntity';
import { random } from 'faker';
import { Connection } from 'typeorm';
import { EntityFactory } from 'typeorm-seeding/dist/entity-factory';

type Entity = PurchaseEntity | ProductEntity | TransactionEntity | CustomerEntity
function createEntity(entity: Entity): Promise<Entity> {
  const promise: Promise<Entity> = new Promise((resolve, reject) => {
    resolve(entity);
  })
  return promise;
}

function forEachPromise(items, fn) {
  return items.reduce((promise, item) => promise.then(() => fn(item)), Promise.resolve);
}
function forEachPromiseContext(items, fn, context) {
  return items.reduce((promise, item) => promise.then(() => fn(item, context)), Promise.resolve);
}
// function forEachPurchase(items, fn) {
//   return items.reduce((promise, purchase: PurchaseEntity) => promise.then(() => fn({ productId: purchase.productId, quantity: purchase.quantity, transactionId: purchase.transactionId })), Promise.resolve);
// }



export class CreateCustomer implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {

    async function createPurchase(purchase): Promise<void> {
      return new Promise(async (resolve, reject) => {
        await factory(PurchaseEntity)({
          productId: purchase.productId, quantity: purchase.quantity, transactionId: purchase.transactionId
        }).create()
        resolve();
      })
    }
    function forEachPurchase(items, fn) {
      return items.reduce((promise, purchase) => promise
        .then(() => fn(purchase)
        // .then(() => fn({ productId: purchase.productId, quantity: purchase.quantity, transactionId: purchase.transactionId })
        ), Promise.resolve);
    }

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
      const t = {
        customerId: customerId,
        transactionId: transactionId,
        total: total,
        rewardsPoints: rewardsPoints
      }
      console.log(t);
      
      await factory(TransactionEntity)(t).create();
      console.log(purchases.length);
      // await factory(PurchaseEntity)({productId: purchases[0].product.id, quantity: purchases[0].quantity, transactionId: purchases[0].transactionId})
      //   .map(async (purchase: PurchaseEntity) => 
      //     await factory(PurchaseEntity)({
      //       productId: purchase.productId, quantity: purchase.quantity, transactionId: purchase.transactionId
      //     }).make()
      //   )
      //   .createMany(purchases.length)
      // .createMany(purchases.length, {productId: purchases[0].product.id, quantity: purchases[0].quantity, transactionId: purchases[0].transactionId})
      
      // forEachPurchase(purchases, createPurchase).then((result) => {
      //   console.log('done seeding');
      //   console.log(result);
        
        
      // }).catch((err) => {
      //   console.log(err);
        
      // });

      // Promise.all(purchases.map(async (f: PurchaseEntity) =>
      //   await factory(PurchaseEntity)({ productId: f.productId, quantity: f.quantity, transactionId: f.transactionId }).create()
      // ))

      // await purchases.reduce(async (memo, purchase) => {
      //   await memo;
      //   return await factory(PurchaseEntity)({ productId: purchase.productId, quantity: purchase.quantity, transactionId: purchase.transactionId }).create();
      // }, undefined)
      // purchases.forEach(async (f: PurchaseEntity) =>
      //   await factory(PurchaseEntity)({ productId: f.productId, quantity: f.quantity, transactionId: f.transactionId }).create()
      // )

    });

  }
}
