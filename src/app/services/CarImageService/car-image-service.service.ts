import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from 'src/models/CarImageModel/carImage';
import { ListResponseModel } from 'src/models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService{

  apiUrl ="https://localhost:44313/api/";
  constructor(private httpClient:HttpClient) { }

  getImageByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath =this.apiUrl+"CarImages/getimagebycarid?carid="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
  }
}
