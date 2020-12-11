import { Product } from './Product';
import { Transaction } from './Transaction';

export interface Purchase {
  id: number;
  productId: Product['id'];
  product: Product;
  transactionId: Transaction['id'];
  quantity: number;
}
