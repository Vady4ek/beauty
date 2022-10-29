import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { OrderService } from 'src/app/store/order.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss']
})
export class ClientInfoComponent implements OnInit {
  
  @Output() next: EventEmitter<void> = new EventEmitter(); 
  @Output() prev: EventEmitter<void> = new EventEmitter(); 

  public orderInfoForm: FormGroup = this.formBuilder.group({
    category: [],
    service: [],
    master: [],
    date: [],
    time: [],
    currency: [],
    name: [],
    phone: [],
    email: [],
    comments: [],
  });

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.orderService.form.subscribe({
      next: (n) => this.orderInfoForm.setValue(n),
      error: (e) => console.error(e)
    });
  }

  changeFormData() {
    const value = this.orderInfoForm.value;
    this.orderService.formBs = value;
  }
}
