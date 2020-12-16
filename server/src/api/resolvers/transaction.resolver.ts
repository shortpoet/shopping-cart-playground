import { Resolver, Query, Arg, Info, Mutation } from "type-graphql";
import { getRepository } from "typeorm";
import { GraphQLResolveInfo } from "graphql";
import { chalkLog } from "../../utils/chalkLog";
import { Transaction } from "../../interfaces/Transaction";
import { TransactionEntity } from "../entity/TransactionEntity";

export async function transactionQuery (entity): Promise<Transaction[]> {
  return await getRepository(entity)
    .createQueryBuilder('transaction')
    .innerJoinAndSelect('transaction.customer', 'customer')
    .innerJoinAndSelect('transaction.purchases', 'purchases')
    .innerJoinAndSelect('purchases.product', 'product')
    .orderBy('transaction.id', 'ASC')
    .getMany() as Transaction[]
}


@Resolver(of => TransactionEntity)
export class TransactionResolver {

  @Query(returns => [TransactionEntity], { nullable: true })
  async transactions(): Promise<Transaction[]> {
    const transactionsPromise = getRepository(TransactionEntity).find();
    // const transactions = await transactionsPromise;
    const transactions = await transactionQuery(TransactionEntity);
    // console.log(transactions);
    chalkLog('magentaBright', '#### database fetch ####');
    if (!transactions) {
      throw new Error(`No transactions`);
    }
    return transactions;
  }

}