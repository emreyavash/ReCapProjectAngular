import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDetailService } from 'src/app/services/CarDetailService/car-detail.service';
import { CarService } from 'src/app/services/CarService/car.service';
import { PaymentService } from 'src/app/services/PaymentService/payment-service.service';
import { RentalService } from 'src/app/services/RentalService/rental.service';
import { Car } from 'src/models/CarModel/car';
import { Payment } from 'src/models/PaymentModel/payment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  car:Car[] ;

  paymentForm:FormGroup;
  
  constructor(
    private paymentService:PaymentService,
    private rentalService:RentalService,
    private carDetailService:CarDetailService,
    private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,
    private location: Location,
    private toastrService:ToastrService
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["carId"]) {
        this.getCarDetail(params["carId"]);
        this.createPaymentForm();
        // this.getCarId(params["carId"]);
        console.log(this.car)

      }
    })
  }
 
  createPaymentForm(){
    
    this.paymentForm = this.formBuilder.group({
      fullName:["",Validators.required],
      cardNo:["",Validators.required],
      month:["",Validators.required],
      year:["",Validators.required],
      cvv:["",Validators.required],
      dailyPrice:[""],
      carId:[""]
    })
  }
  // ,this.paymentForm.controls["dailyPrice"].value,this.paymentForm.controls["carId"].value
  setValue(){
      this.paymentForm.setValue({
        dailyPrice:this.paymentForm.get("dailyPrice").value,
        carId:this.paymentForm.get("carId").value
      })
  }
  getCarDetail(carId:number){
    this.carDetailService.getCarDetailById(carId).subscribe(response=>{
      this.car = response.data;
      
    })
  }
  addPayment(){
    if (this.paymentForm.valid) {
      let paymentModel = Object.assign({},this.paymentForm.value)
      console.log(paymentModel)
      this.paymentService.addPayment(paymentModel).subscribe(response=>{
       
          this.location.back();
        
      },responseError=>{
        if (responseError.error.Errors.length>0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
            
          }
        }
      });

    }
  }
  
  getCarId(carId:number){
    let carReturn = this.car.find(x=>x.id === carId);
    console.log(carReturn)
    return carReturn;
  }
}
