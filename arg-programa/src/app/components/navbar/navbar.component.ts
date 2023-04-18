import { Component, OnInit } from '@angular/core';
import { BannerAboutService } from 'src/app/services/banner-about.service';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  datos:any;
  isUserLogged:boolean = false;

  constructor(private datosBanner:BannerAboutService, private autenticacionService:AutenticacionService){}

  recargarDatos() {
    this.datosBanner.obtenerDatos().subscribe(data => {
      this.datos=data[0];
    });
    this.isUserLogged = this.autenticacionService.isUserLogged();
  }

  ngOnInit(): void {
    this.recargarDatos();   
  }

  logout(){
    this.autenticacionService.logout();
    location.reload();  
    console.log('logout navbar', this.isUserLogged);
  }
}
