import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne} from "typeorm";
import { ObjectType, Field, ID, Arg, Int } from "type-graphql";
import { Customer } from "../../interfaces/Customer";
import { Purchase } from "../../interfaces/Purchase";
import { TransactionEntity } from "./TransactionEntity";
import { Transaction } from "../../interfaces/Transaction";
import { Product } from "../../interfaces/Product";
import { ProductEntity } from "./ProductEntity";

@ObjectType()
@Entity({ name: `purchases`, schema: 'logistics' })
export class PurchaseEntity implements Purchase {

  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;
  
  @Field(type => Int)
  @Column({ name: 'product_id' })
  productId: number;
  @Field(type => ProductEntity)
  @OneToOne(type => ProductEntity, productEntity => productEntity, {
    eager: true
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Field()
  @Column({ name: 'transaction_id'})
  transactionId: string;
  @Field(type => TransactionEntity)
  @ManyToOne(type => TransactionEntity, transactionEntity => transactionEntity.purchases, {
    // eager: true
  })
  @JoinColumn({ name: 'transaction_id' })
  transaction: Transaction;

  @Field(type => Int)
  @Column()
  quantity: number;
  
}
