import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  baseUrl = environment.apiBaseUrl;
  constructor(private httpClient: HttpClient) {}

  getAllPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.baseUrl}/questions`);
  }

  createPost(post: Post): Observable<any> {
    return this.httpClient.post<Post>(`${this.baseUrl}/questions`, post, {
      withCredentials: true,
    });
  }

  getPost(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.baseUrl}/questions/${id}`);
  }

  getAllPostsByUser(name: string): Observable<Post[]> {
    return this.httpClient.get<Post[]>(
      `${this.baseUrl}/api/questions/by-user` + name
    );
  }
}
