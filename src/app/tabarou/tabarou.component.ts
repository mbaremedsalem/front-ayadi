import { Component, OnInit } from '@angular/core';
import { WalletService } from '../services/wallet/wallet.service';

@Component({
  selector: 'app-tabarou',
  templateUrl: './tabarou.component.html',
  styleUrls: ['./tabarou.component.scss']
})
export class TabarouComponent implements OnInit{
  loginInProgress = false;
  wallets: any[] = [];
  selectedOptionImage: string = '';
  selectedOptionText: string = '';
  dropdownOpen: boolean = false;
  codePaiement: string | null = null;

  paymentData = {
    montant: "0",
    nom_payeur: '',
    prenom_payeur: '',
    remarque: ''
  };

  constructor(private walletService: WalletService) {}

  ngOnInit(): void {
    this.walletService.getWallets().subscribe(response => {
      if (response.status === 200) {
        this.wallets = response.data;
        console.log(response.data)

      }
      else{
        console.log('no data fetched .... ')
      }
    });
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectOption(image: string, text: string): void {
    this.selectedOptionImage = image;
    this.selectedOptionText = text;
    this.dropdownOpen = false;
  }

  
  onConfirm() {
    this.loginInProgress = true; 
    this.walletService.makePayment(this.paymentData).subscribe(response => {
      if (response.status === 200) {
        this.codePaiement = response.data.code_paiement;
        this.loginInProgress = false;
        this.clearForm();
      }
    });
  }

  clearForm() {
    this.paymentData = {
      nom_payeur: '',
      prenom_payeur: '',
      remarque: '',
      montant: "0",

    };
  
    // Optional: clear selected image and text if required
    this.selectedOptionText = 'Choisissez une option';
  }

  copyCode() {
    if (this.codePaiement) {
      navigator.clipboard.writeText(this.codePaiement);
      alert('Code copied to clipboard');
    }
  }
}
