import { Routes } from '@angular/router';
import { Empleados } from './components/pages/empleados/empleados';
import { Departamentos } from './components/pages/departamentos/departamentos';

export const routes: Routes = [
  { path: 'empleados', component: Empleados },
  { path: 'departamentos', component: Departamentos },
];
