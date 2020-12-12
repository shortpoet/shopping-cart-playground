import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, PrimaryColumn} from "typeorm";
import { ObjectType, Field, ID, Arg, Int } from "type-graphql";
import { Customer } from "../../interfaces/Customer";
import { Transaction } from "../../interfaces/Transaction";
import { PurchaseEntity } from "./PurchaseEntity";
import { Purchase } from "../../interfaces/Purchase";
import { CustomerEntity } from "./CustomerEntity";

@ObjectType()
@Entity({ name: `transactions`, schema: 'logistics' })
export class TransactionEntity implements Transaction {

  @Field(type => ID)
  @PrimaryColumn()
  id: string;
  
  @Field(type => Int)
  @Column({ name: 'customer_id' })
  customerId: number;
  @Field(type => CustomerEntity)
  @ManyToOne(type => CustomerEntity, customerEntity => customerEntity.transactions, {
    // eager: true
  })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;
  
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
