import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/BrandService/brand.service';
import { CarService } from 'src/app/services/CarService/car.service';
import { ColorService } from 'src/app/services/ColorService/color.service';
import { Brand } from 'src/models/BrandModel/brand';
import { Car } from 'src/models/CarModel/car';
import { Color } from 'src/models/ColorModel/color';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
  updateCarForm:FormGroup;
  colors:Color[];
  brands:Brand[];
  car:Car[];
  constructor(
    private carService : CarService,
    private brandService : BrandService,
    private colorService : ColorService,
    private toastrService : ToastrService,
    private activatedRoute : ActivatedRoute,
    private formBuilder:FormBuilder,
    private location : Location
  ) { }

  ngOnInit(): void {
    this.createCarUpdateForm()
    this.getBrands()
    this.getColors()
    this.activatedRoute.params.subscribe(params=>{
      if (params["carId"]) {
        this.getCarById(params["carId"])
      }
      

    })
  }

  createCarUpdateForm(){
    this.updateCarForm = this.formBuilder.group({
      
      id:["",Validators.required],
      modelName:["",Validators.required],
      dailyPrice:["",Validators.required],
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      description:["",Validators.required]
    })
  }

  getCarById(carId:number){
    this.carService.getCarById(carId).subscribe((response:any) =>{
      this.car = response.data
    })
  }
  updateCar(){
    if (this.updateCarForm.valid) {
      let carModel = Object.assign({},this.updateCarForm.value)
      this.carService.updateCar(carModel).subscribe(response=>{
        this.toastrService.success("Güncellendi","Başarılı")
        this.location.back()
      })
    }else{
      this.toastrService.error("Güncellenemedi","Başarısız")
    }
  }
  getBrands(){
    this.brandService.getBrands().subscribe(response =>{
      this.brands = response.data
    })
  }
  getColors(){
    this.colorService.getColors().subscribe(response =>{
      this.colors = response.data
    })
  }

}
