import { GetMastersService } from 'src/app/store/get-masters.service';
import { GetProductsService } from 'src/app/store/get-products.service';
import { GetServicesService } from 'src/app/store/get-services.service';

import { ListComponent } from 'src/app/components/home-components/list/list.component';
import { TabComponent } from 'src/app/components/home-components/tab/tab.component';

import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChildren } from '@angular/core';

import { Item } from 'src/ts/interfaces/index';

@Component({
  standalone: true,
  imports: [CommonModule, TabComponent, ListComponent],
  providers: [GetServicesService, GetProductsService, GetMastersService],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  @ViewChildren(TabComponent) tabs: TabComponent[] = [];

  public items: {tabItems?: Item[], title: string}[] = [
    {
      title: 'Services'
    },
    {
      title: 'Products'
    },
    {
      title: 'Masters'
    }
  ];

  constructor(
    private getServices: GetServicesService,
    private getProducts: GetProductsService,
    private getMasters: GetMastersService
  ) { }

  ngOnInit(): void {
    this.getServices.service.subscribe({
      next: (n) => (this.items[0].tabItems = n),
      error: (e) => console.error(e.message),
    });

    this.getProducts.product.subscribe({
      next: (n) => (this.items[1].tabItems = n),
      error: (e) => console.error(e.message),
    });

    this.getMasters.master.subscribe({
      next: (n) => (this.items[2].tabItems = n),
      error: (e) => console.error(e.message),
    });
  }

  closeTabs() {
    this.tabs.forEach((tab) => tab.close());
  }
}
