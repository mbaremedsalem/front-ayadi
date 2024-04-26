import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE } from '../models/base/base';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/login-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, ) { }
  private apiUrl = `${API_BASE}login/`;
  login(credentials: any): Observable<LoginResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    return this.http.post<LoginResponse>(this.apiUrl, credentials, httpOptions);
    
  }
}