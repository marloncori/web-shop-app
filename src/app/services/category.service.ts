import  { HttpClient }  from  '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category} from '../models/category';

const baseURI = 'http://localhost:8081/api';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  addCategoryToUser(category: Category, userId: number): Observable<Category> {
    return this.http.post<any>(`${baseURI}/addCategoryToUser/${userId}`, category);
  }

  editCategory(category: Category, id: number): Observable<Category> {
    return this.http.put<Category>(`${baseURI}/editCategory/${id}`, category);
  }

  findCategoryById(categoryId: number): Observable<Category> {
    return this.http.get<Category>(`${baseURI}/findCategoryById/${categoryId}`);
  }

  deleteCategory(id: number): Observable<Category> {
    return this.http.delete<Category>(`${baseURI}/deleteCategory/${id}`); 
  }

  findCategoriesForUser(idUser: number): Observable<Category[]> {
    return this.http.get<Category[]>(`${baseURI}/findCategoriesForUser/${idUser}`); 
  }
  
  findAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${baseURI}/findAllCategories/`); 
  }

}
