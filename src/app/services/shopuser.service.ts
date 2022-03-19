 import  { HttpClient }  from  '@angular/common/http';
 import  { Injectable }  from  '@angular/core';
 import  { Observable }  from  'rxjs';
 import  { ShopUser }    from  '../models/shop-user';

const USERNAME_KEY = 'USERNAME';
const URL = 'http://localhost:8081/api';

 @Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  addUser(user: ShopUser): Observable<ShopUser> {
    return this.http.post<ShopUser>(`${URL}/addUser`, user); 
  }

  editUser(user: ShopUser, idUser: number): Observable<ShopUser> {
    return this.http.put<ShopUser>(`${URL}/editUser/${idUser}`, user); 
  }
  
  findUserById(id: number): Observable<ShopUser> {
     return this.http.get<ShopUser>(`${URL}/findUserById/${id}`); 
   }
   
  deleteUser(id: number): Observable<ShopUser> {
     return this.http.delete<ShopUser>(`${URL}/deleteUser/${id}`); 
   }

   findAllUsers(): Observable<ShopUser[]> {
     return this.http.get<ShopUser[]>(`${URL}/findAllUsers/`); 
   }
   
   findByUsername(name: string): Observable<ShopUser> {
     return this.http.get<ShopUser>(`${URL}/findByUsername/${name}`); 
   }

   saveUsername(username: string): void {
     window.sessionStorage.removeItem( USERNAME_KEY );
     window.sessionStorage.setItem( USERNAME_KEY, username);
   }

    getUsername(): string {
      return sessionStorage.getItem( USERNAME_KEY ) || '{}';
    }

    signOut() {
      window.sessionStorage.clear();
    }

  }