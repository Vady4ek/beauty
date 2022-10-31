import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { GetServicesService } from 'src/app/store/get-services.service';
import { OrderService } from 'src/app/store/order.service';

import { DropDownComponent } from '../drop-down/drop-down.component';
import { OrderButtonComponent } from '../order-button/order-button.component';
import { OrderInputComponent } from '../order-input/order-input.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OrderButtonComponent,
    DropDownComponent,
    OrderInputComponent
  ],
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss']
})
export class OrderInfoComponent implements OnInit {

  @Output() next: EventEmitter<void> = new EventEmitter();

  public serviceOptions: string[] = [];

  public orderInfoForm: FormGroup = this.formBuilder.group({
    category: [],
    service: [null, Validators.required],
    master: [null, Validators.required],
    date: [null, Validators.required],
    time: [null, Validators.required],
    endTime: [],
    price: [],
    currency: [null, Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private services: GetServicesService,
  ) { }

  ngOnInit() {
    this.orderService.orderInfo.subscribe({
      next: (n) => this.orderInfoForm.setValue(n),
      error: (e) => console.error(e)
    });
    this.services.service.subscribe({
      next: (n) => {
        n.forEach((service) => this.serviceOptions.push(service.name));
      },
      error: (e) => console.error(e)
    })
  }

  changeFormData() {
    const value = this.orderInfoForm.value;
    this.orderService.orderInfoBs = value;
  }

  onNext() {
    this.orderInfoForm.markAllAsTouched();

    if(this.orderInfoForm.valid) {
      this.next.emit();
    }
  }
}
