import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { ObjectType, Field, ID, Arg, Int } from "type-graphql";
import { Customer } from "../../interfaces/Customer";
import { Transaction } from "../../interfaces/Transaction";
import { PurchaseEntity } from "./PurchaseEntity";
import { Purchase } from "../../interfaces/Purchase";

@ObjectType()
@Entity({ name: `transactions`, schema: 'logistics' })
export class TransactionEntity implements Transaction {

  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;
  
  @Field(type => Int)
  @Column({ name: 'customer_id' })
  customerId: number;
  
  @Field(type => Int)
  @Column()
  total: number;

  @Field(type => Int)
  @Column({ name: 'rewards_points' })
  rewardsPoints: number;

  @Field(type => [PurchaseEntity])
  @OneToMany(type => PurchaseEntity, PurchaseEntity => PurchaseEntity.transaction, {
    eager: true
  })
  purchases: Purchase[]

}
