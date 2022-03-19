 import  { Component, OnInit }  from  '@angular/core';
 import  { Product } from 'src/app/models/product';
 import  { Category } from 'src/app/models/category';
 import  { ShopUser } from 'src/app/models/shop-user';
 import  { Tag } from 'src/app/models/tag';
 import  { Comment }  from 'src/app/models/comment';
 import  { UserService}  from  'src/app/services/shopuser.service';
 import  { MatDialog}  from  '@angular/material/dialog';
 import  { CategoryService}  from  'src/app/services/category.service';
 import  { ProductService}  from  'src/app/services/product.service';
 import  { ActivatedRoute}  from  '@angular/router';
 import  { TagService}  from  'src/app/services/tag.service';
 import  { CommentService}  from  'src/app/services/comment.service';
 import  { AddTagToProductComponent}  from  './../add-tag-to-product/add-tag-to-product.component';
 import  { AddProductComponent}  from  './../add-product/add-product.component';
 import  { AddCategoryComponent}  from  './../add-category/add-category.component';
 //import  { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  products: Product[] = [];
  user: ShopUser = {} as ShopUser;
  category: Category = {} as Category;
  idCategory: number = 0;
  panelOpenState: boolean = false;
  tags: Tag[] = [];
  comments: Comment[] = [];

  constructor(private productService: ProductService, private categoryService: CategoryService,
    private route: ActivatedRoute, private dialog: MatDialog, private userService: UserService,
     private tagService: TagService, private commentService: CommentService) {
    this.route.params.subscribe(
      params => {
        this.idCategory = this.route.snapshot.params['idCategory'];
        this.categoryService.findCategoryById(this.idCategory).subscribe(category => {
          this.category = category;
          this.productService.findProductsForCategory(this.idCategory).subscribe(products => {
            this.products = products;
          });
        })
        this.userService.findByUsername(this.userService.getUsername()).subscribe(user => {
          this.user = user;
        })
        this.commentService.findAllComments().subscribe(comments => {
          this.comments = comments;
        })
      }
    )
  }
  
  ngOnInit(): void { }
 
   addTag(idProduct: number): void {
    this.dialog.open(AddTagToProductComponent, {
      data: { idProduct }
    })
  }

  showTags(idProduct: number): void {
    this.tagService.findTagsForProduct(idProduct).subscribe(tags => {
      this.tags = tags;
    })
  }

  deleteCategory(idCategory: number, idUser: number): void {
     if (confirm("Are you sure")) {
      this.categoryService.deleteCategory(idCategory).subscribe(() => {
      window.location.replace(`/profile/${idUser}`)
      })
    }
  }

  editCategory(idCategory: number): void {
    this.dialog.open(AddCategoryComponent, {
    data: { idCategory }
    })
  }

  deleteProduct(idProduct: number, idUser: number): void {
      if (confirm("Are you sure")) {
      this.productService.deleteProduct(idProduct).subscribe(() => {
      window.location.replace(`/profile/${idUser}`)
      })
    }
  }

  editProduct(idProduct: number): void {
    this.dialog.open(AddProductComponent, {
    data: { idProduct }
    })
  }

  deleteComment(id: number): void {
    this.commentService.deleteComment(id).subscribe(() => {
    window.location.reload();
    })
  }

}
