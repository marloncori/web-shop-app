import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ProductOrders} from 'src/app/models/product-orders';
import  { ShopUser } from 'src/app/models/shop-user';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/shopuser.service';
import { UpdateProfileComponent } from 'src/app/components/update-profile/update-profile.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {
  orders: ProductOrders;
  total: number = 0;
  paid: boolean = false;
  sub: Subscription | undefined;
  user: ShopUser = new ShopUser();
  hideUpdateMessage = true;
  id: number = 0;
  name: string = "";
  username: string = "";
  email: string = "";
  password: string = "";
  nameOnCard: string = "";
  cardNumber: string = "";
  cvv: number = 0;
  address: string = "";
  errorMessage: string = "";
  hideDiv = true;
  newDate: Date | undefined;
  hideItem: boolean = false;

  constructor(private orderService: OrderService, private userService: UserService, private dialog: MatDialog) {
    this.orders = this.orderService.ProductOrders;
  }

  ngOnInit() {
    this.userService.findByUsername(this.userService.getUsername()).subscribe(user => {
      this.user = user;
      if (this.nameOnCard != null || this.cardNumber || this.cvv || this.address) {
        this.nameOnCard = this.user.nameOnCard;
        this.cardNumber = this.user.cardNumber;
        this.cvv = this.user.cvv;
        this.address = this.user.address;
      }
    })
    this.sub = this.orderService.OrdersChanged.subscribe(() => {
      this.orders = this.orderService.ProductOrders;
    });
    this.loadTotal();
    this.newDate = new Date();
  }

  pay() {
    this.paid = true;
    this.hideDiv = false;
    this.orderService.saveOrder(this.orders).subscribe();
  }

  loadTotal() {
    this.sub = this.orderService.TotalChanged.subscribe(() => {
      this.total = this.orderService.Total;
    });
  }

  goToHome() {
    window.location.reload();
  }

  goToUpdateProfile(idUser: number): void {
    this.hideUpdateMessage = false;
    this.dialog.open(UpdateProfileComponent, {
      data: { idUser }
    })
  }

}