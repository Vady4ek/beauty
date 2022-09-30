import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: 'auth',
    loadComponent: () =>
      import('src/app/pages/auth/auth.component').then((c) => c.AuthComponent),
  },
];

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(RouterModule.forRoot(routes))],
}).catch((err) => console.error(err));
