import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from 'src/ts/interfaces/index';

@Injectable({
  providedIn: 'root',
})
export class GetServicesService {
  private url = 'http://localhost:3000/services';

  constructor(private httpClient: HttpClient) {}

  get service(): Observable<Service[]> {
    return this.httpClient.get<Service[]>(this.url);
  }
}
