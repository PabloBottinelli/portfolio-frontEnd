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
  constructor(private datosBanner:BannerAboutService){}

  ngOnInit(): void {
    this.datosBanner.obtenerDatos().subscribe(data => {
      this.datos=data[0];
    });
  }
}
