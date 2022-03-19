import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart'; 

const NAME_KEY = 'NAME';
const baseURI = 'http://localhost:8081/api';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  addCartToUser(cart: Cart, userId: number): Observable<Cart> {
    return this.http.post<any>(`${baseURI}/addCartToUser/${userId}`, cart);
  }

  removeFromCart(cartId: number, userId: number): Observable<Cart> {
    return this.http.delete<Cart>(`${baseURI}/removeFromCart/${cartId}/${userId}`);
  }  

  findCartById(id: number): Observable<Cart> {
    return this.http.get<Cart>(`${baseURI}/findCartById/${id}`);
  }

  deleteCart(id: number): Observable<Cart> {
    return this.http.delete<Cart>(`${baseURI}/deleteCart/${id}`);
  }

  findCartsForUser(userId: number): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${baseURI}/findCartsForuser/${userId}`);
  }

  findCartByName(name: string): Observable<Cart> {
    return this.http.get<Cart>(`${baseURI}/findCartByName/${name}`);
  }

  saveCartName(name: string): void {
    window.sessionStorage.removeItem(NAME_KEY);
    window.sessionStorage.setItem(NAME_KEY, name);
  }

  getCartName(): string {
    return sessionStorage.getItem(NAME_KEY) || '{}';
  }
  
}
