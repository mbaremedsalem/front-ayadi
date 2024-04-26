import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dossier',
  templateUrl: './dossier.component.html',
  styleUrls: ['./dossier.component.scss']
})
export class DossierComponent {
  selectedClient: string = '';
  selectedCompte: string = '';
  results: any[] = [];
  noResults: boolean = false;

  constructor(private http: HttpClient,private router: Router) {}

  search() {
    if (this.selectedClient && this.selectedCompte) {
      const body = {
        cliprt: this.selectedClient,
        nooper: this.selectedCompte
      };

      this.http.post<any[]>('http://127.0.0.1:8000/api/get-pret-cli-compte/', body)
        .subscribe(
          (data) => {
            if (data.length > 0) {
              this.results = data;
              this.noResults = false;
            } else {
              this.results = [];
              this.noResults = true;
            }
          },
          (error) => {
            console.error('Erreur lors de la récupération des données:', error);
          }
        );
    } else if(this.selectedClient && this.selectedCompte==='') { 
      const body = {
        cliprt: this.selectedClient,
      };
      this.http.post<any[]>('http://127.0.0.1:8000/api/get-pret-cli/', body)
      .subscribe(
        (data) => {
          if (data.length > 0) {
            this.results = data;
            this.noResults = false;
          } else {
            this.results = [];
            this.noResults = true;
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération des données:', error);
        }
      );
    }else {
      console.error('Veuillez remplir les champs client et compte.');
    }
  }

  goToDetails(nooper: string) {
    // Navigation vers la page 'amortissement' avec le paramètre nooper
    this.router.navigate(['/amortissement', nooper]);
  }
}
