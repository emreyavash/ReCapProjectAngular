import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from 'src/models/LoginModel/loginModel';
import { RegisterModel } from 'src/models/RegisterModel/registerModel';
import { SingleResponseModel } from 'src/models/singleResponseModel';
import { TokenModel } from 'src/models/TokenModel/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = "https://localhost:44313/api/auth/"
  constructor(
    private httpClient:HttpClient
  ) { }

  login(login:LoginModel){
    let newPath = this.apiUrl+"login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,login);
  }
  register(register:RegisterModel){
    let newPath =  this.apiUrl + "register"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,register)
  }
  isAuthenticated(){
    if (localStorage.getItem("token")) {
      return true;
    }
    else{
      return false;
    }
  }
}
