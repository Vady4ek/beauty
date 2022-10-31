import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/ts/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GetCategoriesService {
  private url = 'http://localhost:3000/categories';
  private _urlById = '';

  constructor(private httpClient: HttpClient) { }

  get category(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.url);
  }

  set urlById(id: number) {
    this._urlById = `${this.url}?category_id=${id}`;
  }

  get categoryById(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this._urlById);
  }
}
