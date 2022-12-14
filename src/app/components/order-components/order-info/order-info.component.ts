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
    date: [null, [Validators.required, Validators.pattern('^\\d{2}\.\\d{2}\.\\d{4}$')]],
    time: [null, [Validators.required, Validators.pattern('^\\d{2}\.\\d{2}$')]],
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
        this.orderInfoForm.patchValue({ 'price': n[0].price.toFixed(2), 'currency': 'MDL' });
        localStorage.setItem('price', n[0].price.toString());
        localStorage.setItem('duration', n[0].duration.toString());
      },
      error: (e) => console.error(e)
    });
  }

  setTime(time: string) {
    this.changeFormData();

    const timeArr =  time.split(':');

    const minutes = Number(timeArr[0]) * 60 + Number(timeArr[1]);

    const duration = Number(localStorage.getItem('duration')) * 60;

    const newTimeMinutes = minutes + duration;

    const newHours = Number((newTimeMinutes / 60).toFixed(0));
    const newMinutes = newTimeMinutes % 60;

    let stringNewHours: string;
    let stringNewMinutes: string;

    if(Number(newHours) < 10) {
      stringNewHours = `0${newHours - 1}`;
    } else {
      stringNewHours = newHours.toString();
    }

    if(newMinutes < 10) {
      stringNewMinutes = `0${newMinutes}`;
    } else {
      stringNewMinutes = newMinutes.toString();
    }

    const newTime = `${stringNewHours}:${stringNewMinutes}`;

    this.orderInfoForm.patchValue({ 'endTime': newTime })
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

  convertCurrency(id: number) {

    this.currencies.urlById = id;

    this.currencies.currencyById.subscribe({
      next: (n) => { 
        const newPrice  = (Number(localStorage.getItem('price')) / n[0].multiplier).toFixed(2);
        this.orderInfoForm.patchValue({ 'price': newPrice});
      },
      error: (e) => console.error()
    });
  }
}
