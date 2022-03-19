import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginComponent } from 'src/app/components/login/login.component';
import { ProductOrder} from 'src/app/models/product-order';
import { Product } from 'src/app/models/product';
import { ProductOrders } from 'src/app/models/product-orders';
import { ShopUser } from 'src/app/models/shop-user';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/shopuser.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  user: ShopUser = new ShopUser();
  productOrders: ProductOrder[] = [];
  products: Product[] = [];
  selectedProductOrder: ProductOrder | undefined;
  shoppingCartOrders: ProductOrders | undefined;
  sub: Subscription | undefined;
  productSelected = false;
  description: string = '';
  showMyContainerInfo = false;
  showBtn = -1;
  idCart: number = 0;

  constructor(private orderService: OrderService, private router: Router, private dialog: MatDialog,
    private productService: ProductService, private userService: UserService) {
      this.userService.findByUsername(this.userService.getUsername()).subscribe(user => {
        this.user = user;
      });
  }

  ngOnInit() {
    this.productOrders = [];
    this.loadProducts();
    this.loadOrders();

  }

  addToCart(order: ProductOrder, idUser: number) {
    this.orderService.SelectedProductOrder = order;
    this.selectedProductOrder = this.orderService.SelectedProductOrder;
    this.productSelected = true;
  }

  removeFromCart(productOrder: ProductOrder, idUser: number) {
    let index = this.getProductIndex(productOrder.product);
    if (index > -1) {
      this.shoppingCartOrders?.productOrders.splice(
        this.getProductIndex(productOrder.product), 1);
    }
    this.orderService.ProductOrders = this.shoppingCartOrders!;
    this.shoppingCartOrders = this.orderService.ProductOrders;
    this.productSelected = false;
  }

  getProductIndex(product: Product): number {
    return this.orderService.ProductOrders.productOrders.findIndex(
      value => value.product === product);
  }

  isProductSelected(product: Product): boolean {
    return this.getProductIndex(product) > -1;
  }

  loadProducts() {
    this.productService.findAllProducts().subscribe(
      (products: any[]) => {
        this.products = products;
        this.products.forEach(product => {
          this.productOrders.push(new ProductOrder(product, 0));
        })
      }
    );
  }

  loadOrders() {
    this.sub = this.orderService.OrdersChanged.subscribe(() => {
      this.shoppingCartOrders = this.orderService.ProductOrders;
    });
  }

  reset() {
    this.productOrders = [];
    this.loadProducts();
    this.orderService.ProductOrders.productOrders = [];
    this.loadOrders();
    this.productSelected = false;
  }
  productInfo(id: number) {
    this.productService.findProductById(id).subscribe(data => {
      this.description = data.description;
      console.log(this.description);
    });
    this.showMyContainerInfo = !this.showMyContainerInfo;
  }

  showUndoBtn(index: number) {
    this.showBtn = index;
  }
  
  singleProduct(id: number) {
    this.router.navigate(['sangle/product', id]);
  }

  login() {
    this.dialog.open(LoginComponent);
  }
}