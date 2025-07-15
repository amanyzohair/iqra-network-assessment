import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./layout/layout.component').then((m) => m.LayoutComponent),
  },
  {
    path: 'signals',
    loadComponent: () =>
      import('./ngrx-signals/ngrx-signals.component').then(
        (m) => m.NgrxSignalsComponent
      ),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
