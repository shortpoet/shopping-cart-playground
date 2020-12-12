import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { ObjectType, Field, ID, Arg } from "type-graphql";
import { Customer } from "../../interfaces/Customer";
import { Transaction } from "../../interfaces/Transaction";
import { TransactionEntity } from "./TransactionEntity";

@ObjectType()
@Entity({ name: `customers`, schema: 'logistics' })
export class CustomerEntity implements Customer {

  @Field(type => ID)
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
