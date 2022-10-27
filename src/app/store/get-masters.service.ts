import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Master } from 'src/ts/interfaces/index';

@Injectable({
  providedIn: 'root',
})
export class GetMastersService {
  private url = 'http://localhost:3000/masters';

  constructor(private httpClient: HttpClient) {}

  get master(): Observable<Master[]> {
    return this.httpClient.get<Master[]>(this.url);
  }
}
