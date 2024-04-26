import { Component } from '@angular/core';
import { AmortissementService } from '../services/amortissement/amortissement.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-amortissement',
  templateUrl: './amortissement.component.html',
  styleUrls: ['./amortissement.component.scss']
})
export class AmortissementComponent {
  pret: any[] = [];
  selectedCompte: string = '';
  results: any[] = [];
  noResults: boolean = false;
  nooper: string | null = null;
  dataSource = new MatTableDataSource<any>();
  entetCliData: any;
  constructor(private amortissemntService: AmortissementService,private http: HttpClient,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.amortissemntService.fetchEntetCliData('000073', '1001555').subscribe(
      data => {
        this.entetCliData=data;
        console.log(data); // Affiche les données dans la console
        // Faites ce que vous voulez avec les données
      },
      error => {
        console.error(error); // Gérez les erreurs
      }
    );
    // Récupérer le paramètre 'nooper' de l'URL
    this.route.paramMap.subscribe(params => {
      this.nooper = params.get('nooper');
      // Utilisez 'this.nooper' comme nécessaire dans votre composant
    });
    console.log(this.nooper);
    this.getamortissement();
  }

  getamortissement() {
    
    const body = {

      nooper: this.nooper,
    };

    this.http.post<any[]>('http://127.0.0.1:8000/api/get-amotissement-by-nooper/', body)
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
}
  
 // this.amortissemntService.getPret().subscribe((data: any) => {
    //if (Array.isArray(data)) {
      //this.pret = data;
      // Mettre à jour l'ID pour chaque élément de la liste
      //this.pret = data.map((cheque, index) => ({ ...cheque, id: index + 1 }));
      //this.dataSource.data = this.pret; // Set the data for the Material table
  
      // Désinfecter les URLs
      // this.pret.forEach(document => {
      //   document.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`http://127.0.0.1:8000${document.Document}`);
      // });
    //} else {
      //console.error('Les données renvoyées ne sont pas un tableau:', data);
    //}
  //});
}
