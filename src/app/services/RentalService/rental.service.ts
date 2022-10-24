import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/models/listResponseModel';
import { Rental } from 'src/models/RentalModel/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = "https://localhost:44313/api/";
  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl+"rentals/rentalDetail"
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
  getRentalByCarId(carId:number):Observable<ListResponseModel<Rental>>{
    let newPath =this.apiUrl+"rentals/rentalcar?carId="+carId;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
  postRentalCar(rental:Rental):Observable<ListResponseModel<Rental>>{
    let newPath =this.apiUrl+"rentals/add";
    return this.httpClient.post<ListResponseModel<Rental>>(newPath,rental);
  }
}
