import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from 'src/models/BrandModel/brand';
import { ListResponseModel } from 'src/models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl="https://localhost:44313/api/";

  constructor(private httpclient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    let newPath = this.apiUrl + "Brands/getall"
    return this.httpclient.get<ListResponseModel<Brand>>(newPath);
  }
  addBrand(brand:Brand):Observable<ListResponseModel<Brand>>{
    let newPath = this.apiUrl +"brands/add"
    return this.httpclient.post<ListResponseModel<Brand>>(newPath,brand)
  }
 
}
