import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from 'src/ts/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GetJobService {
  private url = 'http://localhost:3000/jobs';
  private _urlById = '';

  constructor(private httpClient: HttpClient) { }

  get job(): Observable<Job[]> {
    return this.httpClient.get<Job[]>(this.url);
  }

  set urlById(id: number) {
    this._urlById = `${this.url}?service_id=${id}`;
  }

  get jobById(): Observable<Job[]> {
    return this.httpClient.get<Job[]>(this._urlById);
  }
}
