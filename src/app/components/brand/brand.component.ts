import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/services/BrandService/brand.service';
import { Brand } from 'src/models/BrandModel/brand';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brands:Brand[]=[];
  currentBrand: Brand;
  readonly defaultCurrentBrand :Brand;
  constructor(private brandService:BrandService) { }
  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    })
  }
  setCurrentBrand(brand:Brand){
    this.currentBrand = brand;
  }
  getCurrentBrandClass(brand:Brand){
    if(brand == this.currentBrand){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }

  setDefaultCurrentBrand(){
    this.currentBrand=this.defaultCurrentBrand;
  }
  getAllBrandClass(){
    if(!this.currentBrand){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }
}
