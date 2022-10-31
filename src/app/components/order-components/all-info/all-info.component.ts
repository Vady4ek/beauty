import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderButtonComponent } from '../order-button/order-button.component';
import { OrderService } from 'src/app/store/order.service';
import { OrderForm } from 'src/ts/interfaces';
import { ClientInfo, OrderInfo } from 'src/ts/interfaces/orderForm';

@Component({
  selector: 'app-all-info',
  standalone: true,
  imports: [CommonModule, OrderButtonComponent],
  templateUrl: './all-info.component.html',
  styleUrls: ['./all-info.component.scss']
})
export class AllInfoComponent implements OnInit {

  orderInfo!: OrderInfo;
  clientInfo!: ClientInfo;

  @Output() prev: EventEmitter<void> = new EventEmitter();
  @Output() submit: EventEmitter<void> = new EventEmitter();

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.orderInfo.subscribe({
      next: (n) => this.orderInfo = n,
      error: (e) => console.error(e)
    });
    this.orderService.clientInfo.subscribe({
      next: (n) => this.clientInfo = n,
      error: (e) => console.error(e)
    });
  }
}
