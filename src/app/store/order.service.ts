import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { OrderForm } from 'src/ts/interfaces/orderForm';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderFormValue: OrderForm = {
    category: '',
    service: '',
    master: '',
    date: '',
    time: '',
    currency: '',
    name: '',
    phone: '',
    email: '',
    comments: '',
  }

  private _formBs: BehaviorSubject<OrderForm> = new BehaviorSubject(this.orderFormValue);
  private _form: Observable<OrderForm> = this._formBs.asObservable();

  private url: string = '';

  get form(): Observable<OrderForm> {
    return this._form;
  }

  set formBs(newValue: OrderForm) {
    this._formBs.next(newValue);
  }

  submit() {
    this.http.post(this.url, {});
  }

  constructor(private http: HttpClient) { }
}
