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
  cliprt: string | null = null;
  dataSource = new MatTableDataSource<any>();
  entetCliData: any;
  constructor(private amortissemntService: AmortissementService,private http: HttpClient,private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Récupérer le paramètre 'nooper' de l'URL
    this.route.paramMap.subscribe(params => {
          this.nooper = params.get('nooper');
          this.cliprt = params.get('cliprt');
          // Utilisez 'this.nooper' comme nécessaire dans votre composant
        });
    this.amortissemntService.fetchEntetCliData(this.cliprt!, this.nooper!).subscribe(
      data => {
        this.entetCliData=data;
        console.log(data); // Affiche les données dans la console
        // Faites ce que vous voulez avec les données
      },
      error => {
        console.error(error); // Gérez les erreurs
      }
    );

    console.log(this.nooper);
    console.log(this.cliprt);
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
            this.results = data.map((cheque, index) => ({ ...cheque, id: index + 1 }));
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

printTable(): void {
  const printContents = this.generatePrintContent();
  const printWindow = window.open('', '_blank');
  printWindow?.document.write('<html><head><title>Tableau d\'Amortissement</title></head><body>');
  printWindow?.document.write('<h2>Tableau d\'Amortissement</h2>');
  printWindow?.document.write(printContents);
  printWindow?.document.write('</body></html>');
  printWindow?.document.close();
  printWindow?.print();
}

generatePrintContent(): string {
  let content = `
  <div style="text-align: center; margin-bottom: 20px;">
  <img src="/assets/icons/AUB.png" alt="AUB" width="200px" height="100px" style="  max-width: 100px;
  height: auto; margin: 0 auto 15px; overflow: hidden; border-radius: 50%;">
  </div>

<div style="display: flex; justify-content: space-between;">
  <div style="margin-bottom: 20px; flex-basis: 48%;">

    <ul>
      <li><strong>Numéro de dossier:</strong> ${this.entetCliData[0]?.Numero_Dossier}</li>
      <li><strong>Type De Pret:</strong> ${this.entetCliData[0]?.Type_De_Pret}</li>
      <li><strong>Date Mis En Place:</strong> ${ this.formatDate(this.entetCliData[0]?.date_mep)}</li>
      <li><strong>Date 1ère échéance:</strong> ${ this.formatDate(this.entetCliData[0]?.date_1ech)}</li>
      <li><strong>Date Derniere échéance:</strong> ${ this.formatDate(this.entetCliData[0]?.date_dern_ech) }</li>
    </ul>
  </div>
  <div style="margin-bottom: 20px; flex-basis: 48%;">
    <ul>
      <li><strong>Prix d'Achat(Capital):</strong> ${this.entetCliData[0]?.prix_achat}  MRO</li>
      <li><strong>Prix de Vente (HT):</strong> ${this.entetCliData[0]?.prix_vente} MRO</li>
      <li><strong>Prix de Vente (TTC):</strong> ${this.entetCliData[0]?.prix_vente} MRO</li>
      <li><strong>Durée de mourabaha:</strong> ${this.entetCliData[0]?.duree_mourabaha} Mois</li>
      <li><strong>TOF:</strong> ${this.entetCliData[0]?.TOF}%</li>
    </ul>
  </div>
</div>

    <table style="border-collapse: collapse; margin: 0 auto; width: 90%;">`; 
  content += `
    <thead>
      <tr>
        <th style="border-right: 1px solid #000;">Numero</th>
        <th style="border-right: 1px solid #000;">Date</th>
        <th style="border-right: 1px solid #000;">Capital</th>
        <th style="border-right: 1px solid #000;">Marge</th>
        <th style="border-right: 1px solid #000;">TOF</th>
        <th style="border-right: 1px solid #000;">Echeance</th>
        <th style="border-right: 1px solid #000;">Capital Restent Dû</th>
      </tr>
    </thead>`;
  content += '<tbody>';
  this.results.forEach((item: any, index: number) => {
    content += '<tr>';
    content += `<td style="border-right: 1px solid #000;">${item.id}</td>`;
    content += `<td style="border-right: 1px solid #000;">${this.formatDate(item.DATRMB)}</td>`;
    content += `<td style="border-right: 1px solid #000;">${item.MNTCAP}</td>`;
    content += `<td style="border-right: 1px solid #000;">${item.MNTINT}</td>`;
    content += `<td style="border-right: 1px solid #000;">${item.MNTTAXE}</td>`;
    content += `<td style="border-right: 1px solid #000;">${item.MNTRMB}</td>`;
    content += `<td style="border-right: 1px solid #000;">${item.SLDAMO}</td>`;
    content += '</tr>';
    // Add separator after each row, except for the last row
    if (index < this.results.length - 1) {
      content += '<tr><td colspan="7" style="border-top: 1px solid #000;"></td></tr>';
    }
  });
  content += '</tbody>';
  content += '</table>';
  return content;
}

formatDate(dateString: string): string {
  // Assuming dateString is in ISO format, you can use Angular's DatePipe to format it
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}
  
}
