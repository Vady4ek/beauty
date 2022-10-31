import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { OrderService } from 'src/app/store/order.service';
import { OrderButtonComponent } from '../order-button/order-button.component';
import { OrderInputComponent } from '../order-input/order-input.component';

@Component({
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    OrderButtonComponent,
    OrderInputComponent
  ],
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss']
})
export class ClientInfoComponent implements OnInit {
  
  @Output() next: EventEmitter<void> = new EventEmitter(); 
  @Output() prev: EventEmitter<void> = new EventEmitter(); 

  public clientInfoForm: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required, Validators.pattern('^[A-Za-z]{3,10}$')]],
    phone: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    comments: [null],
  });

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.orderService.clientInfo.subscribe({
      next: (n) => this.clientInfoForm.setValue(n),
      error: (e) => console.error(e)
    });
  }

  changeFormData() {
    const value = this.clientInfoForm.value;
    this.orderService.clientInfoBs = value;
  }

  onNext() {
    this.clientInfoForm.markAllAsTouched();

    if(this.clientInfoForm.valid) {
      this.next.emit();
    }
  }
}
