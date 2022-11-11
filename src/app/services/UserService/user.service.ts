import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from 'src/models/singleResponseModel';
import { User } from 'src/models/UserModel/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = "https://localhost:44313/api/users/"
  constructor(
    private httpClient:HttpClient
  ) { }

  getUserById(userId:number):Observable<SingleResponseModel<User>>{
    let newPath= this.apiUrl + "getuserdetail?id="+userId;
    return this.httpClient.get<SingleResponseModel<User>>(newPath)
  }
  getUserByEmail(email:string):Observable<SingleResponseModel<User>>{
    let newPath= this.apiUrl + "getuseremail?email="+email;
    return this.httpClient.get<SingleResponseModel<User>>(newPath)
  }
}
