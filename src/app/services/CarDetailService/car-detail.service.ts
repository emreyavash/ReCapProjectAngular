import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/models/CarModel/car';
import { ListResponseModel } from 'src/models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {
  apiUrl ="https://localhost:44313/api/";
  constructor(private httpClient:HttpClient) { }

  getCarDetailById(carId:number):Observable<ListResponseModel<Car>>{
    let newPath =this.apiUrl+"cars/getcarbyid?carId="+carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
}
