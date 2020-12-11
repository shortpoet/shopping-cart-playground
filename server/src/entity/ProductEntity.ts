import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn} from "typeorm";
import { ObjectType, Field, ID, Int, GraphQLISODateTime } from "type-graphql";
import { Product } from "../interfaces/Product";
require("dotenv").config();
console.log("$# Entity Config @7");
console.log("$# PROVIDER @7");
console.log(process.env.PROVIDER);
const dateType = process.env.PROVIDER == 'postgres' ? 'timestamp' : 'datetime'
console.log(dateType);

@ObjectType()
@Entity({ name: `products`, schema: 'logistics' })
export class ProductEntity implements Product {
  
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;
  k
  @Field()
  @Column({ name: 'product_name' })
  productName: string;
  
  @Field(type => Int)
  @Column()
  cost: number;

}
