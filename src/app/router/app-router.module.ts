import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('src/app/layouts/default/default.component').then(
        (c) => c.DefaultComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('src/app/layouts/empty/empty.component').then(
        (c) => c.EmptyComponent
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
})
export class AppRouterModule {}
