import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentCarComponent } from './components/rent-car/rent-car.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:"",pathMatch:"full", component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/:carId", component:CarDetailComponent},
  {path:"rent-car", component:RentCarComponent},
  {path:"rentals", component:RentalComponent},
  {path:"customers", component:CustomerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
