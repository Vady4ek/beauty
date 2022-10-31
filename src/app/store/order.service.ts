import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ClientInfo, OrderForm, OrderInfo } from 'src/ts/interfaces/orderForm';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private _orderForm: OrderForm = {
    category: null,
    service: null,
    master: null,
    date: null,
    time: null,
    endTime: null,
    price: null,
    currency: 'MDL',
    name: null,
    phone: null,
    email: null,
    comments: null,
  }

  private _orderInfo: OrderInfo = {
    category: null,
    service: null,
    master: null,
    date: null,
    time: null,
    endTime: null,
    price: null,
    currency: 'MDL',
  }

  private _clientInfo: ClientInfo = {
    name: null,
    phone: null,
    email: null,
    comments: null,
  }

  private _orderInfoBs: BehaviorSubject<OrderInfo> = new BehaviorSubject<OrderInfo>(this._orderInfo);
  private orderInfoOb: Observable<OrderInfo> = this._orderInfoBs as Observable<OrderInfo>;

  private _clientInfoBs: BehaviorSubject<ClientInfo> = new BehaviorSubject<ClientInfo>(this._clientInfo);
  private clientInfoOb: Observable<ClientInfo> = this._clientInfoBs as Observable<ClientInfo>;

  private url: string = 'http://localhost:3000/orders';

  get orderInfo(): Observable<OrderInfo> {
    return this.orderInfoOb;
  }

  set orderInfoBs(newValue: OrderInfo) {
    this._orderInfoBs.next(newValue);
    this._orderInfo = newValue;
  }

  get clientInfo(): Observable<ClientInfo> {
    return this.clientInfoOb;
  }

  set clientInfoBs(newValue: ClientInfo) {
    this._clientInfoBs.next(newValue);
    this._clientInfo = newValue;
  }

  get submit(): Observable<any> {
    const data = {
      ...this._orderInfo,
      ...this._clientInfo
    };

    return this.http.post(this.url, data);
  }

  constructor(private http: HttpClient) { }
}
