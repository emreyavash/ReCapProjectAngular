import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailService } from 'src/app/services/CarDetailService/car-detail.service';
import { CarImageService } from 'src/app/services/CarImageService/car-image-service.service';
import { RentalService } from 'src/app/services/RentalService/rental.service';
import { CarImage } from 'src/models/CarImageModel/carImage';
import { Car } from 'src/models/CarModel/car';
import { Rental } from 'src/models/RentalModel/rental';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  cars:Car[]=[];
  carImages:CarImage[]=[];
  rentalCars:Rental[]=[];
  rentDate:string;
  returnDate:string;
  dateEmpty=false;
  imageUrl ="https://localhost:44313/Uploads";
  constructor(private carDetailService:CarDetailService,
    private rentalService:RentalService,
    private carImageService:CarImageService,
    private toastrService:ToastrService,
    private router:Router,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["carId"]) {
      this.getCarById(params["carId"])
      this.getCarImage(params["carId"])
        
      } else {
        console.log("olmadı")
      }
    })
  }

  getCarById(carId:number){
    this.carDetailService.getCarDetailById(carId).subscribe(response=>{
      this.cars = response.data;
    })
    
  }
  getCarImage(carId:number){
    this.carImageService.getImageByCarId(carId).subscribe(response=>{
      this.carImages = response.data;
    })
  }
  postRentalCar(carId:number,rentDate:string,returnDate:string){
    this.rentalService.getRentalByCarId(carId).subscribe(response=>{
      this.rentalCars = response.data;
      let rentedDate=this.rentalCars.find(x=>new Date(x.rentDate).toLocaleDateString() == new Date(rentDate).toLocaleDateString())
      console.log(rentDate)
      if(rentedDate){
        this.toastrService.error("Bu tarihte araba kiralıktır.",rentedDate.brandName)
        this.dateEmpty =false;
      }
      else if(rentDate == undefined || returnDate == undefined){
        this.toastrService.error("Tarih seçmelisiniz.")

      }
      else{
        this.dateEmpty = true;
        this.toastrService.success("Ödeme sayfasına gidiliyor.");
        

      }
      return this.dateEmpty ? this.router.navigate(["cars/carDetail/"+carId+"/payment"]):this.dateEmpty =false;

    })

  }
  
}
