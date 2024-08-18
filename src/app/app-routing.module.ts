import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabarouComponent } from './tabarou/tabarou.component';

const routes: Routes = [

  {
    path:'',
    component:TabarouComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
