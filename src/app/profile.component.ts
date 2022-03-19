import  { Component, OnInit }  from  '@angular/core';
import  { Router, ActivatedRoute }  from  '@angular/router';
import  { ShopUser }  from  'src/app/models/shop-user';
import  { Cart }  from  'src/app/models/cart';
import  { Category }  from  'src/app/models/category';
import  { AddTagComponent }  from  'src/app/components/add-tag/add-tag.component';
import  { CategoryService }  from  'src/app/services/category.service';
import  { MatDialog }  from  '@angular/material/dialog';
import  { UserService }  from  'src/app/services/shopuser.service';
import  { AddCategoryComponent }  from  'src/app/components/add-category/add-category.component';
import  { AddProductComponent }  from  'src/app/components/add-product/add-product.component';
import  { UpdateProfileComponent }  from  'src/app/components/update-profile/update-profile.component';
import  { CartService }  from  'src/app/services/cart.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  categories: Category[] = [];
  carts: Cart[] = [];
  user: ShopUser = {} as ShopUser;
  cartLength = 0;
  
  constructor(private userService: UserService, private route: ActivatedRoute,
    private dialog: MatDialog, private categoryService: CategoryService,
    private cartService: CartService, private router: Router){ 
    
      this.route.params.subscribe((params) => {
        this.userService
          .findByUsername(this.userService.getUsername())
          .subscribe((user) => {
            this.user = user;
            this.cartService.findCartsForUser(this.user.id).subscribe((carts) => {
              this.carts = carts;
              this.cartLength = this.carts.length;
            });
            this.categoryService.findAllCategories().subscribe((categories) => {
              this.categories = categories;
            });
          });
      });
    }

  ngOnInit(): void {
  }

  logout(id: number): void {
    window.location.replace('/dashboard');
    this.userService.signOut();
  }
  
  addCategory(idUser: number): void {
    this.dialog.open(AddCategoryComponent, {
      data: { idUser },
    });
  }

  addProduct(categoryId: number): void {
    this.dialog.open(AddProductComponent, {
      data: { categoryId },
    });
  }

  addTag(): void {
    this.dialog.open(AddTagComponent);
  }
  
  updateProfile(userId: number): void {
    this.userService.editUser(this.user, userId);
    this.dialog.open(UpdateProfileComponent);
  }
  
  deleteCart(proId: number, userId: number): void {
    if (confirm('Are you sure')) {
      this.cartService.removeFromCart(proId, userId).subscribe(() => {
        window.location.reload();
      });
    }
  }

  singleProduct(name: string): void {
    this.router.navigate(['/puy/product/', name]);
  }

}
