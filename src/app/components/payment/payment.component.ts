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
import { Rental } from 'src/models/RentalModel/rental';
import { AuthService } from 'src/app/services/AuthService/auth.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  car:Car[] ;
  rentCar = JSON.parse(localStorage.getItem("Car"))

  paymentForm:FormGroup;
  
  constructor(
    private paymentService:PaymentService,
    private rentalService:RentalService,
    private authService:AuthService,
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
      price:[this.rentCar['dailyPrice']],
      carId:[this.rentCar["carId"]],
      userId:[this.rentCar["customerId"]],
    })
  }
  // ,this.paymentForm.controls["dailyPrice"].value,this.paymentForm.controls["carId"].value
  // setValue(){
  //     this.paymentForm.setValue({
  //       dailyPrice:this.paymentForm.get("dailyPrice").value,
  //       carId:this.paymentForm.get("carId").value
  //     })
  // }
  getCarDetail(carId:number){
    this.carDetailService.getCarDetailById(carId).subscribe(response=>{
      this.car = response.data;
      
    })
  }
  addPayment(){
    if (this.paymentForm.valid) {
      let paymentModel = Object.assign({},this.paymentForm.value)
   
      
      this.paymentService.addPayment(paymentModel).subscribe(response=>{
          // console.log(rentCar["carId"])
          // rental:Rental = {"carId":this.rentCar["carId"],"customerId":this.rentCar["customerId"],"findexPoint":this.rentCar["findexPoint"],"userFindexPoint":this.rentCar["userFindexPoint"],"rentDate":this.rentCar["rentDate"],"returnDate":this.rentCar["returnDate"]}
          
            let rentalModel = Object.assign({},this.rentCar)
            console.log(rentalModel)
            this.rentalService.postRentalCar(this.rentCar).subscribe(response=>{
              this.location.back();
              this.toastrService.success("Ödeme Başarılı")
            })
          
          
        
      },responseError=>{
        if (responseError.error.Errors.length>0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
            
          }
        }
      });
   
     

    }
  }
  
 
}
