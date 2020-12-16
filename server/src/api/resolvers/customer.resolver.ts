import { Resolver, Query, Arg, Info, Mutation } from "type-graphql";
import { getRepository } from "typeorm";
import { GraphQLResolveInfo } from "graphql";
import { chalkLog } from "../../utils/chalkLog";
import { Customer } from "../../interfaces/Customer";
import { CustomerEntity } from "../entity/CustomerEntity";

export async function customerQuery (entity): Promise<Customer[]> {
  return await getRepository(entity)
    .createQueryBuilder('customer')
    .innerJoinAndSelect('customer.transactions', 'transactions')
    .innerJoinAndSelect('transactions.purchases', 'purchases')
    .innerJoinAndSelect('purchases.product', 'product')
    .orderBy('customer.id', 'ASC')
    .getMany() as Customer[]
}

@Resolver(of => CustomerEntity)
export class CustomerResolver {

  @Query(returns => [CustomerEntity], { nullable: true })
  async customers(): Promise<Customer[]> {
    const customersPromise = getRepository(CustomerEntity).find();
    // const customers = await customersPromise;
    chalkLog('magentaBright', '#### database fetch ####');
    const customers = await customerQuery(CustomerEntity)

    if (!customers) {
      throw new Error(`No customers`);
    }

    return customers;
  }

}