import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ShopUser } from './models/shop-user';
import { Category } from './models/category';
import { UserService } from './services/shopuser.service';
import { CategoryService } from './services/category.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'online-shop';
  categories: Category[] | undefined;
  shopuser: ShopUser = {} as ShopUser;

  userObserver = {
    next: (user: ShopUser) => this.shopuser = user,
    error: (err: Error) => alert(err.message),
    complete: () => console.log('Data has been successfully sent.'),
  };

  constructor(public dialog: MatDialog, private userService: UserService, 
    private categoryService: CategoryService) {
    this.userService.findByUsername(userService
      .getUsername()).subscribe(this.userObserver);
  }

  categoryObserver = {
    next: (category: Category[]) => this.categories = category,
    error: (err: Error) => alert(err.message),
    complete: () => console.log('Category data has been successfully sent.'),
  };

  ngOnInit(): void {
    this.categoryService.findAllCategories()
    .subscribe(this.categoryObserver);
  }

  login(): void{
    this.dialog.open(LoginComponent);
  }

}
