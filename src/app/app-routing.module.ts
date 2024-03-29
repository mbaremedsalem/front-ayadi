import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmortissementComponent } from './amortissement/amortissement.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },

  {
    path:'',
    component:AmortissementComponent,
    // children:[
    //   {
    //     path:'statistique',
    //     component:PageStatistiqueComponent,
    //   },
    //   {
    //     path:'articles',
    //     component:PageArticlesComponent,
    //   },
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
