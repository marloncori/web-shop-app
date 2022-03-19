 import  { HttpClient }  from  '@angular/common/http';
 import  { Injectable }  from  '@angular/core';
 import  { Observable }  from  'rxjs';
 import  { Comment }  from  '../models/comment';

 const baseURI = 'http://localhost:8081/api';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  addCommentToProduct(comment: Comment, productId: number): Observable<Comment> {
    return this.http.post<Comment>(`${baseURI}/addCommentToProduct/${productId}`, comment);
  }

  editComment(comment: Comment, id: number): Observable<Comment> {
    return this.http.put<Comment>(`${baseURI}/editComment/${id}`, comment);
  }

  findCommentById(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${baseURI}/findCommentById/${id}`);
  }

  deleteComment(id: number): Observable<Comment> {
    return this.http.delete<Comment>(`${baseURI}/deleteComment/${id}`);
  }

  findCommentsForProduct(productId: number): Observable<Comment[]> {
     return this.http.get<Comment[]>(`${baseURI}/findCommentsForProduct/${productId}`);
  }
 
  findAllComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${baseURI}/findAllComments/`); 
  }

}
