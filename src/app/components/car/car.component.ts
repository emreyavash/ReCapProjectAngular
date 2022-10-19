import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CarImageService } from 'src/app/services/CarImageService/car-image-service.service';
import { CarService } from 'src/app/services/CarService/car.service';
import { CarImage } from 'src/models/CarImageModel/carImage';
import { Car } from 'src/models/CarModel/car';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars:Car[]=[];
  dataLoaded=false;
  constructor(private carService:CarService,
    private activatedRouter:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarsByCategory(params["brandId"])
      }
      else if(params["colorId"])
      {
        this.getCarsByColor(params["colorId"])

      }
      else{
        this.getCars()
      }
      
    })
    
    
  }
  getCars(){
    this.carService.getCars().subscribe(response =>{
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByCategory(brandId:number){
    this.carService.getCarsByCategory(brandId).subscribe(response=>{
      this.cars = response.data;
      this.dataLoaded = true;

    })
    
  }
  getCarsByColor(colorId:number){
      this.carService.getCarsByColor(colorId).subscribe(response=>{
        this.cars=response.data;
        this.dataLoaded = true;

      })
  }
  goCarDetail(carId:number){
    return this.router.navigate(["cars/carDetail/"+carId]);
  }
}
