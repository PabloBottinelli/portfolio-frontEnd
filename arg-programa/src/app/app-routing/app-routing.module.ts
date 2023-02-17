import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { BannerComponent } from '../components/banner/banner.component';
import { PageError404Component } from '../components/page-error404/page-error404.component';

const routes: Routes = [
  {path: '/', redirectTo: '/Home', pathMatch: 'full'},
  {path: '/home', component:BannerComponent},
  {path: '**', component:PageError404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }