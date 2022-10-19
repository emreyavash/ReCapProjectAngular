import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from 'src/models/BrandModel/brand';
import { ListResponseModel } from 'src/models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl="https://localhost:44313/api/Brands/getall";

  constructor(private httpclient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    return this.httpclient.get<ListResponseModel<Brand>>(this.apiUrl);
  }
 
}
