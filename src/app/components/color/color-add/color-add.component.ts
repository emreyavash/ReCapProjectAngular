import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/ColorService/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {
  colorAddForm:FormGroup
  constructor(
    private colorService : ColorService,
    private toastrService : ToastrService,
    private location : Location,
    private formBuilder : FormBuilder
  ) { }

  ngOnInit(): void {
    this.createColorAddForm()
  }
  createColorAddForm(){
    this.colorAddForm = this.formBuilder.group({
      colorName:["",Validators.required]
    })
  }
  addColor(){
    if (this.colorAddForm.valid) {
      let colorModel = Object.assign({},this.colorAddForm.value)
      this.colorService.addColor(colorModel).subscribe(response=>{
        this.toastrService.success("Renk Eklendi","Başarılı")
        this.location.back()
      })
    }else{
      this.toastrService.error("Renk Eklenemedi","Dikkat")
    }
  }
}
