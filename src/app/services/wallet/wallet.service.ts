// wallet.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  private apiUrl = 'http://159.203.176.54/ayadi/get-wallets/';
  private apiUrl1 = 'http://159.203.176.54/ayadi/demand_payment/';
  private apiUrlmasrivi = 'http://159.203.176.54/ayadi/create_transaction/';
  constructor(private http: HttpClient) {}

  getWallets(): Observable<any> {
    // const headers = new HttpHeaders().set('Authorization', 'Api-Key zNHv7vXH.d3gUeL8nAUBF63PMy8XNU5vSGEvzgeOH');
    return this.http.get<any>(this.apiUrl);
  }

  makePayment(paymentData: any): Observable<any> {
    // const headers = new HttpHeaders().set('Authorization', 'Api-Key zNHv7vXH.d3gUeL8nAUBF63PMy8XNU5vSGEvzgeOH');
    return this.http.post(this.apiUrl1, paymentData);
  }

  peimantMasrivi(paymentData: any): Observable<any> {
    return this.http.post(this.apiUrlmasrivi, paymentData, { observe: 'response' });
  }
  
}
