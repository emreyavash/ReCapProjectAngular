import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/BrandService/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {
  brandAddForm:FormGroup
  constructor(
    private formBuilder : FormBuilder,
    private brandService : BrandService,
    private toastrService : ToastrService,
    private location : Location
  ) { }

  ngOnInit(): void {
    this.createBrandAddForm()
  }
  createBrandAddForm(){
    this.brandAddForm = this.formBuilder.group({
      brandName:["",Validators.required]
    })
  }
  addBrand(){
    if (this.brandAddForm.valid) {
      let brandModel = Object.assign({},this.brandAddForm.value)
      this.brandService.addBrand( brandModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        this.location.back()
      })
      
    }else{
      this.toastrService.error("Marka Eklenemedi","Dikkat !!")
    }
  }
}
