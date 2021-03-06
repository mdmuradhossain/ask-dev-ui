import { HttpClient } from '@angular/common/http';
import { Comment } from '../comment/comment.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  baseUrl = environment.apiBaseUrl;
  constructor(private httpClient: HttpClient) {}

  getAllCommentsForPost(postId: number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(
      `${this.baseUrl}/answers/by-post/${postId}`
    );
  }

  postComment(comment: Comment): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/answers`, comment);
  }

  getAllCommentsByUser(name: string) {
    return this.httpClient.get<Comment[]>(
      `${this.baseUrl}/answers/by-user/' + name`
    );
  }
}
