import { Product } from "./product";

export class ProductOrder {
    id: number = 0;
    product: Product;
    quantity: number = 1;
    constructor(product: Product, quantity: number) {
      this.product = product;
      this.quantity = quantity = 1;
    }
  }