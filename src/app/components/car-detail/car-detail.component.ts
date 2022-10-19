import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetailService } from 'src/app/services/CarDetailService/car-detail.service';
import { CarImageService } from 'src/app/services/CarImageService/car-image-service.service';
import { CarImage } from 'src/models/CarImageModel/carImage';
import { Car } from 'src/models/CarModel/car';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  cars:Car[]=[];
  carImages:CarImage[]=[];
  imageUrl ="https://localhost:44313/Uploads/Images/";
  constructor(private carDetailService:CarDetailService,
    private carImageService:CarImageService,
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
}
