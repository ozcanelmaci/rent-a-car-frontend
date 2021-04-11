import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CustomerComponent } from './components/customer/customer.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';
import { UpdateComponent } from './components/update/update.component';

const routes: Routes = [
  {path:"",pathMatch:"full", component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/add", component:CarAddComponent},
  {path:"cars/update/:carId", component:UpdateComponent},
  {path:"brands/update/:brandId", component:UpdateComponent},
  {path:"colors/update/:colorId", component:UpdateComponent},
  {path:"brands/add", component:BrandAddComponent},
  {path:"colors/add", component:ColorAddComponent},
  {path:"cars/:carId", component:CarDetailComponent},
  {path:"payment/:carId", component:PaymentComponent},
  {path:"rentals", component:RentalComponent},
  {path:"customers", component:CustomerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
