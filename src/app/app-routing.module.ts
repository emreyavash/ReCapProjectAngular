import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand/brand-add/brand-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarAddComponent } from './components/car/car-add/carr-add.component';
import { CarUpdateComponent } from './components/car/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color/color-add/color-add.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/carDetail/:carId/payment",component:PaymentComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/carDetail/:carId",component:CarDetailComponent},
  {path:"cars/carAdd",component:CarAddComponent},
  {path:"brands/BrandAdd",component:BrandAddComponent},
  {path:"colors/colorAdd",component:ColorAddComponent},
  {path:"cars/carupdate/:carId",component:CarUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
