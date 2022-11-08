import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/BrandService/brand.service';
import { CarService } from 'src/app/services/CarService/car.service';
import { ColorService } from 'src/app/services/ColorService/color.service';
import { Brand } from 'src/models/BrandModel/brand';
import { Color } from 'src/models/ColorModel/color';
@Component({
  selector: 'app-carr-add',
  templateUrl: './carr-add.component.html',
  styleUrls: ['./carr-add.component.css']
})
export class CarAddComponent implements OnInit {
  colors:Color[]=[];
  brands:Brand[]=[];
  carAddForm:FormGroup;
  constructor(
    private carService:CarService,
    private colorService:ColorService,
    private brandService:BrandService,
    private location:Location,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService  ) { }

  ngOnInit(): void {

    this.createCarAddForm();
    this.getBrands();
    this.getColors();
  }
  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      modelName:["",Validators.required],
      brandId:+["",Validators.required],
      colorId:+["",Validators.required],
      modelYear:["",Validators.required],
      description:["",Validators.required],
      dailyPrice:["",Validators.required],
    })
  }
  addCar(){
    if (this.carAddForm.valid) {
      let carModel = Object.assign( {},this.carAddForm.value)
      this.carService.addCar(carModel).subscribe(response =>{
        this.toastrService.success(response.message,"Başarılı")
        this.location.back()

      })
    }else{
      this.toastrService.error("Eklenemedi","Dikkat!!!")
    }

  }
  getColors(){
    this.colorService.getColors().subscribe(r=>{
      this.colors = r.data
    })
  }
  getBrands(){
    this.brandService.getBrands().subscribe(r=>{
      this.brands = r.data
    })
  }


}
