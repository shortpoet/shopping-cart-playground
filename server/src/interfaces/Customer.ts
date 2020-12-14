import { Product } from "./Product";
import { Transaction } from "./Transaction";

// export interface CustomerConstructor {
//   new (): Customer
// }

// export interface Customer extends CustomerConstructor{
export interface Customer{
  id: number;
  firstName: string;
  lastName: string;
  transactions?: Transaction[]
}
