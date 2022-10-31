import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Master } from 'src/ts/interfaces/index';

@Injectable({
  providedIn: 'root',
})
export class GetMastersService {
  private url = 'http://localhost:3000/masters';
  private _urlById = '';

  constructor(private httpClient: HttpClient) { }

  set urlById(id: number) {
    this._urlById = `${this.url}?master_id=${id}`;
  }

  get master(): Observable<Master[]> {
    return this.httpClient.get<Master[]>(this.url);
  }

  get masterById(): Observable<Master[]> {
    return this.httpClient.get<Master[]>(this._urlById);
  }
}
