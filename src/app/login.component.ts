import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShopUser } from 'src/app/models/shop-user';
import { UserService } from 'src/app/services/shopuser.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  shopuser: ShopUser = {} as ShopUser;
  progressBar: Boolean = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {}

  userObserver = {
    next: (user: ShopUser) => {
      this.shopuser = user;
      this.userService.saveUsername(user.username);
      window.location.replace('/');
    },
    error: (err: Error) => alert(err.message),
    complete: () => console.log('Data has been sent.')
  }

  addUser() {
     this.progressBar = true;
     this.userService.addUser(this.shopuser)
                      .subscribe(this.userObserver);
   }

}
