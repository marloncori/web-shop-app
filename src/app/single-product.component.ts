import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginComponent } from 'src/app/components/login/login.component';
import { ProductOrder } from 'src/app/models/product-order'; 
import { Product } from 'src/app/models/product'; 
import { ProductOrders } from 'src/app/models/product-orders'; 
import { UpdateProduct } from 'src/app/models/update-product';
import { Tag } from 'src/app/models/tag'; 
import { ShopUser } from 'src/app/models/shop-user'; 
import { Comment } from 'src/app/models/comment'; 
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';
import { CommentService } from 'src/app/services/comment.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { TagService } from 'src/app/services/tag.service';
import { UserService } from 'src/app/services/shopuser.service';
import { OrdersComponent } from '../orders/orders.component';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})

export class SingleProductComponent implements OnInit {
  name: string = '';
  user: ShopUser = {} as ShopUser;
  productOrders: ProductOrder[] = [];
  products: Product[] = [];
  tags: Tag[] = [];
  comment: Comment = {} as Comment;
  comments: Comment[] | undefined;
  cartExist: Cart = {} as Cart;
  cart: Cart = {} as Cart;
  selectedProductOrder: ProductOrder | undefined;
  shoppingCartOrders: ProductOrders | undefined;
  sub: Subscription | undefined;
  productSelected: boolean = false;
  collapsed: boolean = true;
  orderFinished: Boolean = false;
  showBtn: number = -1;
  submitted: boolean = false;

  @ViewChild('shoppingCartC')
  shoppingCartC: ShoppingCartComponent | undefined;

  @ViewChild('ordersC')
  ordersC: OrdersComponent | undefined;

  description: string = '';
  showMyContainerInfo: boolean = false;

  idProduct: number = 0;
  product: UpdateProduct | undefined;

  counter: number = 1;
  @Input() url = location.href;

  constructor(private productService: ProductService, private tagService: TagService,
    private orderService: OrderService, private route: ActivatedRoute, private userService: UserService,
    private commentService: CommentService, private dialog: MatDialog,
    private cartService: CartService) {

  }

  ngOnInit() {
    this.loadOrders();
    this.singleProduct();
    this.userService.findByUsername(this.userService.getUsername()).subscribe(user => {
      this.user = user;
    })
  }

  addToCart(order: ProductOrder, idUser: number) {
    this.orderService.SelectedProductOrder = order;
    this.selectedProductOrder = this.orderService.SelectedProductOrder;
    this.productSelected = true;
    this.cart.name = order.product.name;
    this.cart.price = order.product.price;
    this.cart.quantity = order.quantity;
    this.cart.pictureUrl = order.product.pictureUrl;
    this.cartService.addCartToUser(this.cart, idUser).subscribe(cart => {
      this.cart = cart;
      this.cartService.saveCartName(this.cart.name);
    })
  }

  removeFromCart(productOrder: ProductOrder, idUser: number): void {
    let index = this.getProductIndex(productOrder.product);
    if (index > -1) {
      this.shoppingCartOrders!.productOrders.splice(
        this.getProductIndex(productOrder.product), 1);
      const name = this.cartService.getCartName();
      this.cartService.findCartsForUser(idUser).subscribe(carts => {
        this.cartExist = carts.filter(item => item.name === name)[0];
        this.cartService.removeFromCart(this.cartExist.id, idUser).subscribe(() => {
        })
      })
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

  loadOrders() {
    this.sub = this.orderService.OrdersChanged.subscribe(() => {
      this.shoppingCartOrders = this.orderService.ProductOrders;
    });
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  finishOrder(orderFinished: Boolean): void {
    this.orderFinished = orderFinished;
  }

  reset(): void {
    this.productOrders = [];
    this.orderService.ProductOrders.productOrders = [];
    this.loadOrders();
    this.productSelected = false;
    this.orderFinished = false;
    this.shoppingCartC!.reset();
    this.ordersC!.paid = false;
  }

  commentsObserver = {
    next: (comments: Comment[]) => {
      this.comments! = comments;
    },
    erro: (err: Error) => alert(err.message)
  };

  private singleProduct(): void {
    this.product = new UpdateProduct();
    this.idProduct = this.route.snapshot.params['idProduct'];
    this.tagService.findTagsForProduct(this.idProduct).subscribe(tags => {
      this.tags = tags;
    });
    this.commentService.findCommentsForProduct(this.idProduct).subscribe(this.commentsObserver);
    this.productService.findProductById(this.idProduct).subscribe(data => {
      this.name = data.name;
      this.productService.findByName(this.name).subscribe((products) => {
        this.product = products;
        this.products.forEach(product => {
          this.productOrders.push(new ProductOrder(product, 0));
        });
      });
      this.submitted = true;
    });
  }

  addComment(idProduct: number, username: string): void {
    this.comment.addedBy = username;
    this.commentService.addCommentToProduct(this.comment, idProduct).subscribe(comment => {
      this.comment = comment;
      window.location.reload();
    })
  }
  
  login(): void {
    this.dialog.open(LoginComponent);
  }

}