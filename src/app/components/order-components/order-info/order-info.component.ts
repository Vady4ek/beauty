import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GetCategoriesService } from 'src/app/store/get-categories.service';
import { GetCurrencyService } from 'src/app/store/get-currency.service';
import { GetJobService } from 'src/app/store/get-job.service';
import { GetMastersService } from 'src/app/store/get-masters.service';

import { GetServicesService } from 'src/app/store/get-services.service';
import { OrderService } from 'src/app/store/order.service';
import { Job, Option } from 'src/ts/interfaces';

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

  public serviceOptions: Option[] = [];
  public categoryOptions: Option[] = [];
  public masterOptions: Option[] = [];
  public currencyOptions: Option[] = [];

  public orderInfoForm: FormGroup = this.formBuilder.group({
    category: [],
    service: [null, Validators.required],
    master: [null, Validators.required],
    date: [null, Validators.required],
    time: [null, Validators.required],
    endTime: [],
    price: [null],
    currency: [null, Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private services: GetServicesService,
    private categories: GetCategoriesService,
    private jobs: GetJobService,
    private masters: GetMastersService,
    private currencies: GetCurrencyService
  ) { }

  ngOnInit() {
    this.orderService.orderInfo.subscribe({
      next: (n) => this.orderInfoForm.setValue(n),
      error: (e) => console.error(e)
    });

    this.categories.category.subscribe({
      next: (n) => n.forEach((category) => {
        const option: Option = { id: category.category_id, value: category.name };
        this.categoryOptions.push(option);
      }),
      error: (e) => console.error()
    });

    this.services.service.subscribe({
      next: (n) => {
        n.forEach((service) => {
          const option: Option = { id: service.service_id, value: service.name };
          this.serviceOptions.push(option);
        });
      },
      error: (e) => console.error(e)
    })

    this.currencies.currency.subscribe({
      next: (n) => {
        n.forEach((currency) => {
          const option: Option = { id: currency.id, value: currency.name };
          this.currencyOptions.push(option);
        });

        console.log(this.currencyOptions);
      },
      error: (e) => console.error(e)
    });
  }

  changeFormData() {
    const value = this.orderInfoForm.value;
    this.orderService.orderInfoBs = value;
  }

  onNext() {
    this.orderInfoForm.markAllAsTouched();

    if (this.orderInfoForm.valid) {
      this.next.emit();
    }
  }

  setPrice(id: number) {
    this.changeFormData();


    this.services.urlById = id;

    this.services.serviceById.subscribe({
      next: (n) => {
        this.orderInfoForm.patchValue({ 'price': n[0].price.toFixed(2) })
      },
      error: (e) => console.error(e)
    });
  }

  setTime() {
    this.orderInfoForm.patchValue({ 'endTime': '15:00' })
  }

  changeCategory(id: number) {
    this.serviceOptions = [];

    this.services.urlByCategoryId = id;

    this.services.serviceByCategoryId.subscribe({
      next: (n) => n.forEach((service) => {
        const option: Option = { id: service.service_id, value: service.name };
        this.serviceOptions.push(option);
      }),
      error: (e) => console.error()
    });
  }

  changeMasters(id: number) {
    this.masterOptions = [];

    this.jobs.urlById = id;

    this.jobs.jobById.subscribe({
      next: (n) => {
        n.forEach((job) => {
          this.masters.urlById = job.master_id;

          this.masters.masterById.subscribe({
            next: (n) => {
              const option: Option = {
                id: n[0].master_id,
                value: n[0].name,
              }

              this.masterOptions.push(option);
            },
            error: (e) => console.error(e)
          });
        });
      },
      error: (e) => console.error(e)
    })
  }

  setMultiplier(id: number) {

    this.currencies.urlById = id;

    this.currencies.currencyById.subscribe({
      next: (n) => { 
        const newPrice  = (this.orderInfoForm.controls['price'].value / n[0].multiplier).toFixed(2);
        this.orderInfoForm.patchValue({ 'price': newPrice}) 
      },
      error: (e) => console.error()
    });
  }
}
