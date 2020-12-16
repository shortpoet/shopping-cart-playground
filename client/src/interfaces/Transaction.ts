import { Customer } from './Customer';
import { Purchase } from './Purchase';

export interface Transaction {
  id: string;
  customerId: Customer['id'];
  customer: Customer;
  total: number;
  rewardsPoints: number;
  purchases: Purchase[];
}
