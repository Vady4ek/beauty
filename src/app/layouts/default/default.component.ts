import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/components/layout/header/header.component';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('src/app/pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'order',
    loadComponent: () =>
      import('src/app/pages/order/order.component').then((c) => c.OrderComponent),
  },
];

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
