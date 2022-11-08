import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from 'src/models/CarModel/car';
import { ListResponseModel } from 'src/models/listResponseModel';
import { CarAdd } from 'src/models/CarModel/carAdd';
@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl ="https://localhost:44313/api/";
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl+"cars/carsdetail";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  addCar(car:CarAdd):Observable<ListResponseModel<CarAdd>>{
    let newPath = this.apiUrl+"cars/add";
    return this.httpClient.post<ListResponseModel<CarAdd>>(newPath,car);
  }
  getCarById(id:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl +"cars/getcarbyid?carId="+id;
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
  getCarsByCategory(id:number):Observable<ListResponseModel<Car>>{
    let newPath =this.apiUrl +"cars/cardetailbycategory?brandId="+id;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByColor(colorId:number){
    let newPath = this.apiUrl+"cars/getcarsbycolors?colorId="+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
  getCarsByColorAndBrand(brandId:number,colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl+"cars/getcarbycolorandbrandid?brandId="+brandId+"&&"+"colorId="+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  updateCar(car:Car):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl +"cars/update";
    return this.httpClient.post<ListResponseModel<Car>>(newPath,car)
  }
}
