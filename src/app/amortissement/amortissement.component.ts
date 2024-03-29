import { Component } from '@angular/core';
import { AmortissementService } from '../services/amortissement/amortissement.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-amortissement',
  templateUrl: './amortissement.component.html',
  styleUrls: ['./amortissement.component.scss']
})
export class AmortissementComponent {
  pret: any[] = [];
  dataSource = new MatTableDataSource<any>();
  
  constructor(private amortissemntService: AmortissementService,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.amortissemntService.getPret().subscribe((data: any) => {
      if (Array.isArray(data)) {
        this.pret = data;
        this.dataSource.data = this.pret; // Set the data for the Material table
    
        // Désinfecter les URLs
        // this.pret.forEach(document => {
        //   document.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`http://127.0.0.1:8000${document.Document}`);
        // });
      } else {
        console.error('Les données renvoyées ne sont pas un tableau:', data);
      }
    });
  }
}
