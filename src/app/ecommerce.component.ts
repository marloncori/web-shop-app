import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { OrdersComponent } from '../orders/orders.component';
import { ProductsComponent } from '../products/products.component';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.css']
})
export class EcommerceComponent implements OnInit {
  orderFinished = false;
  name: any = "";
  showSearch = false;
  products: Product[] = [];
  product: Product = {} as Product;
  showButton = -1;
  showMyContainerInfo = false;

  @ViewChild('productsC')
  productsC: ProductsComponent | undefined;

  @ViewChild('shoppingCartC')
  shoppingCartC: ShoppingCartComponent | undefined;
  
  @ViewChild('ordresC')
  ordersC: OrdersComponent | undefined;
  
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
  }

  finishOrder(orderFinished: boolean): void {
    this.orderFinished = orderFinished;
  }

  reset(): void {
    this.orderFinished = false;
    this.productsC!.reset();
    this.shoppingCartC!.reset();
    this.ordersC!.paid = false;
  }

  productObserver = {
    next: (data: Product) => {
      this.product = data;
      this.showSearch = true;
    },
    error: (err: Error) => alert(err.message)
  };

  search() {
    this.productService.findByName(this.name).subscribe(this.productObserver);
  }

  showUndoButton(index: number): void {
    this.showButton = index;
  }

  infoObserver = {
    next: (data: Product) => this.product = data,
    error: (err: Error) => alert(err.message),
    complete: () => console.log('Info about has product has been loaded')
  };

  productInfo(id: number): void {
    this.productService.findProductById(id).subscribe(this.infoObserver);
    this.showMyContainerInfo = !this.showMyContainerInfo;
  }

  singleProduct(id: number): void {
    this.router.navigate(['single/product', id]);
  }

}
