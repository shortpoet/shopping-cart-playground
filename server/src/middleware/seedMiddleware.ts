import { SeedingEntity } from '../orm/seeds/SeedingEntity';
import { TransactionEntity } from '../api/entity/TransactionEntity';
import { SeedHandler } from '../orm/seeds/SeedHandler';
import { NextFunction, Request, Response } from 'express';
import { EntityManager, getConnection, getRepository, QueryRunner } from 'typeorm';
import { chalkLog } from '../utils/chalkLog';

export const seedMiddleware = async (req, res, next) => {
  chalkLog('magenta', '#### seed middleware ####')
  chalkLog('green', `'ip:', ${req.ip}`)
  console.log('purple', '#### seed middleware ####')
  let isSeedingComplete;
  // next()
  if (await isSeedingComplete) {
    // seeding has already taken place,
    // we can short-circuit to the next middleware
    return next();
  }

  isSeedingComplete = (async () => {
    if ((await getRepository(TransactionEntity).find()).length == 0) {        
      const seedHandler = new SeedHandler(getConnection().createQueryRunner('master'));
      await seedHandler.seedData()
    }

    //https://stackoverflow.com/questions/51198817/typeorm-how-to-seed-database

    // for example you start with an initial seeding entry called 'initial-seeding'
    // on 2019-06-27. if 'initial-seeding' already exists in db, then this
    // part is skipped
    // if (!await this.entityManager.findOne(SeedingEntity, { id: 'initial-seeding' })) {
    //   await this.entityManager.transaction(async transactionalEntityManager => {

    //     // persist in db that 'initial-seeding' is complete
    //     await transactionalEntityManager.save(new SeedingEntity('initial-seeding'));
    //   });
    // }

    // now a month later on 2019-07-25 you add another seeding
    // entry called 'another-seeding-round' since you want to initialize
    // entities that you just created a month later
    // since 'initial-seeding' already exists it is skipped but 'another-seeding-round'
    // will be executed now.
    // if (!await this.entityManager.findOne(SeedingEntity, { id: 'another-seeding-round' })) {
    //   await this.entityManager.transaction(async transactionalEntityManager => {
    //     // persist in db that 'another-seeding-round' is complete
    //     await transactionalEntityManager.save(new SeedingEntity('another-seeding-round'));
    //   });
    // }

    return true;
  })();

  await isSeedingComplete;

  next();

}

// export class SeedingMiddleware {
//   private isSeedingComplete: Promise<boolean>;
//   constructor(
//     private readonly queryRunner: QueryRunner,
//     private req:Request,
//     private res:Response,
//     private next:NextFunction
//   ) {
//   }
//   use = async () => {
//     chalkLog('purple', '#### seed middleware ####')
//     chalkLog('green', `'ip:', ${this.req.ip}`)
//     console.log('purple', '#### seed middleware ####')
//     if (await this.isSeedingComplete) {
//       // seeding has already taken place,
//       // we can short-circuit to the next middleware
//       return this.next();
//     }

//     this.isSeedingComplete = (async () => {
//       if (!await getRepository(TransactionEntity).find()) {        
//         const seedHandler = new SeedHandler(this.queryRunner);
//         await seedHandler.seedData()
//       }

//       //https://stackoverflow.com/questions/51198817/typeorm-how-to-seed-database

//       // for example you start with an initial seeding entry called 'initial-seeding'
//       // on 2019-06-27. if 'initial-seeding' already exists in db, then this
//       // part is skipped
//       // if (!await this.entityManager.findOne(SeedingEntity, { id: 'initial-seeding' })) {
//       //   await this.entityManager.transaction(async transactionalEntityManager => {

//       //     // persist in db that 'initial-seeding' is complete
//       //     await transactionalEntityManager.save(new SeedingEntity('initial-seeding'));
//       //   });
//       // }

//       // now a month later on 2019-07-25 you add another seeding
//       // entry called 'another-seeding-round' since you want to initialize
//       // entities that you just created a month later
//       // since 'initial-seeding' already exists it is skipped but 'another-seeding-round'
//       // will be executed now.
//       // if (!await this.entityManager.findOne(SeedingEntity, { id: 'another-seeding-round' })) {
//       //   await this.entityManager.transaction(async transactionalEntityManager => {
//       //     // persist in db that 'another-seeding-round' is complete
//       //     await transactionalEntityManager.save(new SeedingEntity('another-seeding-round'));
//       //   });
//       // }

//       return true;
//     })();

//     await this.isSeedingComplete;

//     this.next();
//   }
// }

// export const seedMiddleware = async(req: Request, res: Response, next) => {
//   const isSeedingComplete = !!(await getRepository(TransactionEntity).find());


//   // console.log(req);
//   // console.log(res);
//   // console.log(Object.keys(req));
//   // console.log(req.statusCode);
//   // console.log(req.res.statusCode);
//   // console.log(res.statusCode);

//   next();
// }
