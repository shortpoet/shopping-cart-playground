import { Resolver, Query, Arg, Info, Mutation } from "type-graphql";
import { getRepository } from "typeorm";
import { GraphQLResolveInfo } from "graphql";
import { chalkLog } from "../../utils/chalkLog";
import { Transaction } from "../../interfaces/Transaction";
import { TransactionEntity } from "../entity/TransactionEntity";

@Resolver(of => TransactionEntity)
export class TransactionResolver {

  @Query(returns => [TransactionEntity], { nullable: true })
  async transactions(): Promise<Transaction[]> {
    const transactionsPromise = getRepository(TransactionEntity).find();
    const transactions = await transactionsPromise;
    chalkLog('magentaBright', '#### database fetch ####');
    if (!transactions) {
      throw new Error(`No transactions`);
    }
    return transactionsPromise;
  }

}