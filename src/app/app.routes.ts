import { Routes } from '@angular/router';
import { VehiclesComponent } from './vehicles';
import { NoContentComponent } from './no-content';

export const ROUTES: Routes = [
   { path: '',      component: NoContentComponent },
  { path: 'vehicles', component: VehiclesComponent },
  { path: '**',    component: NoContentComponent },
];
