import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/ts/interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {
  private url = 'http://localhost:3000/products';

  constructor(private httpClient: HttpClient) {}

  get product(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.url);
  }
}
