import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseUrl = environment.apiBaseUrl;
  constructor(private httpClient: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.baseUrl}/categories`);
  }

  createCategory(category: Category) {
    return this.httpClient.post<Category>(
      `${this.baseUrl}/categories`,
      category
    );
  }
}
