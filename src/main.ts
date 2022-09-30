import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    loadComponent: () =>
      import('src/app/layouts/default/default.component').then(
        (c) => c.DefaultComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('src/app/pages/home/home.component').then(
            (c) => c.HomeComponent
          ),
      },
    ],
  },
  {
    path: 'order',
    loadComponent: () =>
      import('src/app/layouts/default/default.component').then(
        (c) => c.DefaultComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('src/app/pages/order/order.component').then(
            (c) => c.OrderComponent
          ),
      },
    ],
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('src/app/layouts/auth/auth.component').then(
        (c) => c.AuthComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('src/app/pages/auth/auth.component').then(
            (c) => c.AuthComponent
          ),
      },
    ],
  },
  {
    path: 'help',
    loadComponent: () =>
      import('src/app/layouts/default/default.component').then(
        (c) => c.DefaultComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('src/app/pages/help/help.component').then(
            (c) => c.HelpComponent
          ),
      },
    ],
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('src/app/layouts/default/default.component').then(
        (c) => c.DefaultComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('src/app/pages/orders/orders.component').then(
            (c) => c.OrdersComponent
          ),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('src/app/layouts/empty/empty.component').then(
        (c) => c.EmptyComponent
      ),
  },
];

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(RouterModule.forRoot(routes))],
}).catch((err) => console.error(err));
