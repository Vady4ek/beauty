import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Currency } from 'src/ts/interfaces/currency';

@Injectable({
  providedIn: 'root'
})
export class GetCurrencyService {
  private url = 'http://localhost:3000/currency';
  private _urlById = '';

  constructor(private httpClient: HttpClient) { }

  get currency(): Observable<Currency[]> {
    return this.httpClient.get<Currency[]>(this.url);
  }

  set urlById(id: number) {
    this._urlById = `${this.url}?id=${id}`;
  }

  get currencyById(): Observable<Currency[]> {
    return this.httpClient.get<Currency[]>(this._urlById);
  }
}
