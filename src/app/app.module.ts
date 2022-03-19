import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AddTagComponent } from './components/add-tag/add-tag.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AddTagToProductComponent } from './components/add-tag-to-product/add-tag-to-product.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DisplayCategoryComponent } from './components/display-category/display-category.component';
import { DisplayTagComponent } from './components/display-tag/display-tag.component';
import { EcommerceComponent } from './ecommerce/ecommerce/ecommerce.component';
import { OrdersComponent } from './ecommerce/orders/orders.component';
import { ProductsComponent } from './ecommerce/products/products.component';
import { SingleProductComponent } from './ecommerce/single-product/single-product.component';
import { ShoppingCartComponent } from './ecommerce/shopping-cart/shopping-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    UpdateProfileComponent,
    CategoriesComponent,
    AddCategoryComponent,
    AddProductComponent,
    AddTagComponent,
    AddTagToProductComponent,
    DashboardComponent,
    DisplayCategoryComponent,
    DisplayTagComponent,
    EcommerceComponent,
    OrdersComponent,
    ProductsComponent,
    SingleProductComponent,
    ShoppingCartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatProgressBarModule,
    RouterModule,
    FormsModule,
    MatExpansionModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
