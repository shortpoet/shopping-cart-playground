import { Moment } from 'moment';
import { Customer } from './Customer';
import { Purchase } from './Purchase';

export interface Transaction {
  id: number;
  customerId: Customer['id'];
  rewardsPoints: number;
  purchases: Purchase[];
}
