import { OrderInfoComponent } from 'src/app/components/order-components/order-info/order-info.component';
import { ClientInfoComponent } from 'src/app/components/order-components/client-info/client-info.component';
import { AllInfoComponent } from 'src/app/components/order-components/all-info/all-info.component';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { OrderService } from 'src/app/store/order.service';
import { ModalComponent } from 'src/app/components/layout/modal/modal.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ClientInfoComponent,
    OrderInfoComponent,
    AllInfoComponent,
    ReactiveFormsModule,
    ModalComponent
  ],
  providers: [
    OrderService
  ],
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})

export class OrderComponent implements OnInit {
  public modal = false;

  public step = 2;

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {}

  submit() {
    this.orderService.submit.subscribe({
      next: (n) => this.modal = true,
      error: (e) => console.error(e)
    });
  }

  next() {
    this.step++;
  }

  prev() {
    this.step--;
  }
}
