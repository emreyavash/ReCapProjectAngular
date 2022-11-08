import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Color } from 'src/models/ColorModel/color';
import { ListResponseModel } from 'src/models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl ="https://localhost:44313/api/";
  constructor(private httpClient:HttpClient) { }
  
  getColors():Observable<ListResponseModel<Color>>{
    let newPath = this.apiUrl+"colors/getall"
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }
  addColor(color:Color):Observable<ListResponseModel<Color>>{
    let newPath = this.apiUrl +"colors/add"
    return this.httpClient.post<ListResponseModel<Color>>(newPath,color)
  }
}
