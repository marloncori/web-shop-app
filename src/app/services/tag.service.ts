 import   { HttpClient }  from  '@angular/common/http';
 import   { Injectable }  from  '@angular/core';
 import   { Observable }  from  'rxjs';
 import   { Product}      from '../models/product';
 import   { Tag }         from  '../models/tag';

 const URL = 'http://localhost:8080/api';
 
 @Injectable({
  providedIn: 'root'
 })

export class TagService {

  constructor(private http: HttpClient) { }

  addTagToProduct(tag: Tag, idProduct: number, idTag: number): Observable<Tag> {
    return this.http.post<Tag>(`${URL}/addTagToProduct/${idProduct}/${idTag}`, tag); 
  }
  
  editTag(tag: Tag, id: number): Observable<Tag> {
    return this.http.put<Tag>(`${URL}/editTag/${id}`, tag); 
  }
  
  addTag(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(`${URL}/addTag/`, tag); 
  }

   findTagById(id: number): Observable<Tag> {
     return this.http.get<Tag>(`${URL}/findTagById/${id}`); 
   }
   
  deleteTag(id: number): Observable<Tag> {
     return this.http.delete<Tag>(`${URL}/deleteTag/${id}`); 
   }

  findTagsForProduct(idProduct: number): Observable<Tag[]> {
     return this.http.get<Tag[]>(`${URL}/findTagsForProduct/${idProduct}`); 
  }
   
  findAllTags(): Observable<any[]> {
     return this.http.get<any[]>(`${URL}/findAllTags/`); 
  }
   
   findByName(name: string): Observable<Product> {
     return this.http.get<Product>(`${URL}/findByName/${name}`); 
   }
   
   deleteProductFromTag(idProduct: number, idTag: number): Observable<Product> {
     return this.http.delete<Product>(`${URL}/deleteProductFromTag/${idProduct}/${idTag}`); 
   }
   
   findAllTagsByName(name: number): Observable<Tag> {
     return this.http.get<Tag>(`${URL}/findAllTagsByName/${name}`); 
   }
   
  findProductsForTag(idTag: number): Observable<Product[]> {
     return this.http.get<Product[]>(`${URL}/findProductsForTag/${idTag}`); 
   }

}