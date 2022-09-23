import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderInfoComponent } from 'src/app/components/order-components/order-info/order-info.component';
import { ClientInfoComponent } from 'src/app/components/order-components/client-info/client-info.component';

@Component({
  standalone: true,
  imports: [CommonModule, ClientInfoComponent, OrderInfoComponent],
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
