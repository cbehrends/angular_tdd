import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import {ClaimsComponent} from '../claims/claims.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent},
  { path: 'claims', pathMatch: 'full', component: ClaimsComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
