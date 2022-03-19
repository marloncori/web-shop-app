 import  { Component, OnInit }  from  '@angular/core';
 import  { Router }  from  '@angular/router';
 import  { ShopUser }  from  'src/app/models/shop-user';
 import  { UserService }  from  'src/app/services/shopuser.service';
 import  { MatProgressBarModule } from '@angular/material/progress-bar';
 import  { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})

export class UpdateProfileComponent implements OnInit {
  user: ShopUser = {} as ShopUser;
  progressBar = true;
  
 constructor(private userService: UserService) {}
  
 ngOnInit(): void { 
     this.userService.findByUsername(this.userService.getUsername())
     .subscribe(user => {
        this.user = user;
    })
 }

 updateUser(userId: number): any {
    this.progressBar = true;
    this.userService.editUser(this.user, userId)
    .subscribe((user) => {
        this.user = user;
        this.userService.saveUsername(user.username);
        window.location.reload();
    });
  }

}