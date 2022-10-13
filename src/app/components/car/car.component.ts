import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/CarService/car.service';
import { Car } from 'src/models/CarModel/car';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars:Car[]=[];
  dataLoaded=false;
  constructor(private carService:CarService) { }

  ngOnInit(): void {
    this.getCars();
  }
  getCars(){
    this.carService.getCars().subscribe(response =>{
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
}
