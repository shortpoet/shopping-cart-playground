import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { ObjectType, Field, ID, Int } from "type-graphql";
import { Customer } from "../../interfaces/Customer";
import { Transaction } from "../../interfaces/Transaction";
import { TransactionEntity } from "./TransactionEntity";

// function createCustomer(ctor: CustomerConstructor): Customer {
//   return new ctor();
// }

// export interface CustomerConstructor {
//   new (): CustomerEntity
// }


@ObjectType()
@Entity({ name: `customers`, schema: 'logistics' })
// export class CustomerEntity implements CustomerConstructor {
export class CustomerEntity {
  // constructor() {
  //   return new CustomerEntity();
  //   // createCustomer()
  // }

  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;
  
  @Field()
  @Column({ name: 'first_name' })
  firstName: string;
  
  @Field()
  @Column({ name: 'last_name' })
  lastName: string;

  @Field(type => [TransactionEntity])
  @OneToMany(type => TransactionEntity, transaction => transaction.customer, {
    // eager: true,
    nullable: true
  })
  transactions?: Transaction[];

}
