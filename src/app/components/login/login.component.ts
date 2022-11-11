import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { UserService } from 'src/app/services/UserService/user.service';
import { User } from 'src/models/UserModel/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  user:User;
  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private authService:AuthService,
    private userService:UserService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm =this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    }) 
  }

  login(){
    if (this.loginForm.valid) {
      let loginModule = Object.assign({},this.loginForm.value)
      console.log(loginModule['email'])
      this.userService.getUserByEmail(loginModule['email']).subscribe(response=>{
        this.user=response.data
      
        localStorage.setItem('User',JSON.stringify({'email':this.user.email,'firstName':this.user.firstName,'lastName':this.user.lastName,"status":this.user.status,"id":this.user.userId,"findexPoint":this.user.findexPoint}))
      })
      this.authService.login(loginModule).subscribe(response=>{
        this.toastrService.success(response.message);
        localStorage.setItem("token",response.data.token)
        this.router.navigate(["cars"])
      },responseError=>{
        this.toastrService.info("Giriş yapılmadı")
      })
    }

  }
}
