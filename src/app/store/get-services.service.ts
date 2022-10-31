import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from 'src/ts/interfaces/index';

@Injectable({
  providedIn: 'root',
})
export class GetServicesService {
  private url = 'http://localhost:3000/services';
  private _urlById = '';
  private _urlByCategoryId = '';

  constructor(private httpClient: HttpClient) { }

  get service(): Observable<Service[]> {
    return this.httpClient.get<Service[]>(this.url);
  }

  set urlById(id: number) {
    this._urlById = `${this.url}?service_id=${id}`;
  }

  set urlByCategoryId(id: number) {
    this._urlByCategoryId = `${this.url}?category_id=${id}`;
  }

  get serviceById(): Observable<Service[]> {
    return this.httpClient.get<Service[]>(this._urlById);
  }

  get serviceByCategoryId(): Observable<Service[]> {
    return this.httpClient.get<Service[]>(this._urlByCategoryId);
  }
}
