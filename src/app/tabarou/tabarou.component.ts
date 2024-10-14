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
  selectedTab: number = 1; // Onglet par défaut sélectionné

  paymentData = {
    montant: "0",
    nom_payeur: '',
    prenom_payeur: '',
    remarque: ''
  };

  paymentMasriviData = {
    amount: "0",
    currency: '929',
    description: ''
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



//   onConfirmMasrivi() {
//     this.loginInProgress = true; // Set a loading indicator or similar
//     const newWindow = window.open('', '_blank', 'width=1000,height=1000');
//     if (!newWindow) {
//       console.error('Impossible d’ouvrir une nouvelle fenêtre.');
//       return;
//     }
//     this.walletService.peimantMasrivi(this.paymentMasriviData).subscribe(
//         response => {
//             this.loginInProgress = false; // Reset the loading indicator

//             // Check if the response indicates success
//             if (response.status === 200) {
//                 // Handle success response
//                 newWindow.document.write(response.body); // Écrit le contenu HTML
//                 // Optionally navigate to a success page or show a success message
//             } else {
//                 // Handle unexpected status codes
//                 console.error("Unexpected response status:", response.status);
//                 // Optionally show an error message to the user
//             }
//         },
//         error => {
//             this.loginInProgress = false; // Reset the loading indicator on error
//             console.error("Payment error:", error);
//             // Optionally show an error message to the user
//         }
//     );
// }
  
onConfirmMasrivi() {
  this.loginInProgress = true; // Set a loading indicator or similar


  this.walletService.peimantMasrivi(this.paymentMasriviData).subscribe(
      response => {
          this.loginInProgress = false; // Reset the loading indicator
          const newWindow = window.open('', '_blank', 'width=1000,height=1000');
  
          if (!newWindow) {
              console.error('Impossible d’ouvrir une nouvelle fenêtre.');
              return;
          }
          // Now the response is treated as text, which is HTML
          newWindow.document.write(response); 
          newWindow.document.close(); // Close the document to render the content
      },
      error => {
          this.loginInProgress = false; // Reset the loading indicator on error
          console.error("Payment error:", error);
          // Optionally show an error message to the user
      }
  );
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