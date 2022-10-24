import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BrandService } from 'src/app/services/BrandService/brand.service';
import { CarImageService } from 'src/app/services/CarImageService/car-image-service.service';
import { CarService } from 'src/app/services/CarService/car.service';
import { ColorService } from 'src/app/services/ColorService/color.service';
import { Brand } from 'src/models/BrandModel/brand';
import { CarImage } from 'src/models/CarImageModel/carImage';
import { Car } from 'src/models/CarModel/car';
import { Color } from 'src/models/ColorModel/color';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars:Car[]=[];
  colors:Color[]=[];
  brands:Brand[]=[];
  dataLoaded=false;
  filterText="";
  selectedColor:Color;
  selectedBrand:Brand;

  constructor(private carService:CarService,
    private colorService:ColorService,
    private brandService:BrandService,
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
        this.getCars();
        
      }
      this.getBrands();
      this.getColors();
    })
    
    
  }
  getColors(){
    this.colorService.getColors().subscribe(response =>{
      this.colors = response.data;
      this.dataLoaded = true;
    });
  }
  getBrands(){
    this.brandService.getBrands().subscribe(response =>{
      this.brands = response.data;
      this.dataLoaded = true;
    });
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
  getCarsByColorAndBrand(){
    let brandId =this.selectedBrand.id;
    let colorId =this.selectedColor.id
    this.carService.getCarsByColorAndBrand(brandId,colorId).subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded = true;
    })
  }
  

}
