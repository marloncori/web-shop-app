 import  { Component, Inject, OnInit }  from  '@angular/core';
 import  { ProductService }  from  'src/app/services/product.service';
 import  { Product}  from  'src/app/models/product';
 import  { MAT_DIALOG_DATA }  from  '@angular/material/dialog';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit {
  product: Product = {} as Product;
  showProgressBar = false;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private productService: ProductService) { }

  ngOnInit(): void {
    if (this.data.idProduct != null) {
      this.productService.findProductById(this.data.idProduct).subscribe(product => {
        this.product = product;
      })
    }
  }

  addProduct(): void {
    this.showProgressBar = true;
    if (this.data.idProduct != null) {
      this.productService.editProduct(this.product, this.data.idProduct).subscribe(product => {
        this.product = product;
        window.location.reload();
      })
     } else {
      this.productService.addProductToCategory(this.product, this.data.idCategory).subscribe(product => {
        this.product = product;
        window.location.reload();
      })
    }
  }

}
  