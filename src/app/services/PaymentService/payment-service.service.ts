import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from 'src/models/PaymentModel/payment';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl ="https://localhost:44313/api/"
  constructor(private httpClient:HttpClient) { }

  addPayment(payment:Payment):Observable<ListResponseModel<Payment>>{
    let newPath = this.apiUrl+"fakebanks/add"
    return this.httpClient.post<ListResponseModel<Payment>>(newPath,payment);
  }
}
