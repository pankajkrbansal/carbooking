import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewCarsComponent } from './view-cars/view-cars.component';
import {BookingFormComponent} from './booking-form/booking-form.component';
import {RegisterComponent} from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'', component: ViewCarsComponent},
  {path:'view', component: ViewCarsComponent},
  {path:'bookcar',component:BookingFormComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
