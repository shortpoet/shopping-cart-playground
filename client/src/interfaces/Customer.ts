import { Transaction } from "./Transaction";

export interface Customer{
  id: number;
  firstName: string;
  lastName: string;
  transactions?: Transaction[]
}
