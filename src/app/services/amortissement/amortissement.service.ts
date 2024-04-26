import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE } from 'src/app/models/base/base';

@Injectable({
  providedIn: 'root'
})
export class AmortissementService {

  constructor(private http: HttpClient) { }
  getPret(): Observable<any[]> {
    // Vous devez ajouter le jeton d'authentification ici si nécessaire
    // const headers = new HttpHeaders().set('Authorization', 'Bearer '+localStorage.getItem('access'));

    return this.http.get<any[]>(`${API_BASE}get-amotissement/`);
  }

  fetchEntetCliData(cliprt: string, nooper: string): Observable<any> {
    const body = { cliprt, nooper };
    return this.http.post<any>(`${API_BASE}get-entet-cli/`, body);
  }
}
