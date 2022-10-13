import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandResponseModel } from 'src/models/BrandModel/brandResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl="https://localhost:44313/api/Brands/getall";

  constructor(private httpclient:HttpClient) { }
  getBrands():Observable<BrandResponseModel>{
    return this.httpclient.get<BrandResponseModel>(this.apiUrl);
  }
}
