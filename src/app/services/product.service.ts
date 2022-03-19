 import  { HttpClient }  from  '@angular/common/http';
 import  { Injectable }  from  '@angular/core';
 import  { Observable }  from  'rxjs';
 import  { Product }     from  '../models/product';

 const URL = 'http://localhost:8081/api';

 @Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http: HttpClient) { }

  addProductToCategory(product: Product, categoryId: number): Observable<Product> {
    return this.http.post<Product>(`${URL}/addProductToCategory/${categoryId}`, product); 
  }
  
  editProduct(product: Product, id: number): Observable<Product> {
    return this.http.put<Product>(`${URL}/editProduct/${id}`, product); 
  }

  findProductById(id: number): Observable<Product> {
     return this.http.get<Product>(`${URL}/findProductById/${id}`); 
   }
   
  deleteProduct(id: number): Observable<Product> {
     return this.http.delete<Product>(`${URL}/deleteProduct/${id}`); 
   }

   findProductsForCategory(categoryId: number): Observable<Product[]> {
     return this.http.get<Product[]>(`${URL}/findProductsForCategory/${categoryId}`); 
   }
   
   findAllProducts(): Observable<Product[]> {
     return this.http.get<Product[]>(`${URL}/findAllProducts/`); 
   }
   
   findByName(name: string): Observable<Product> {
     return this.http.get<Product>(`${URL}/findByName/${name}`); 
   }
   
   deleteProductFromTag(productId: number, tagId: number): Observable<Product> {
     return this.http.delete<Product>(`${URL}/deleteProductFromTag/${productId}/${tagId}`); 
   }

}