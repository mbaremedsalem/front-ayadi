import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { API_BASE } from '../models/base/base';
=======
import { API_BASE_URL } from '../models/base/base';
>>>>>>> 8f4a3d453f9b2435ffc2f36cbb6efce105c66f09
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/login-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, ) { }
<<<<<<< HEAD
  private apiUrl = `${API_BASE}login/`;
=======
  private apiUrl = `${API_BASE_URL}token/`;
>>>>>>> 8f4a3d453f9b2435ffc2f36cbb6efce105c66f09
  login(credentials: any): Observable<LoginResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    return this.http.post<LoginResponse>(this.apiUrl, credentials, httpOptions);
    
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 8f4a3d453f9b2435ffc2f36cbb6efce105c66f09
