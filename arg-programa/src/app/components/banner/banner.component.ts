import { Component, OnInit } from '@angular/core';
import { BannerAboutService } from 'src/app/services/banner-about.service';
import { EducationService } from 'src/app/services/education.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})

export class BannerComponent implements OnInit{
  banner:any;
  educaciones:any;
  editarBanner:FormGroup;

  constructor(private datosBanner:BannerAboutService, private datosEducacion:EducationService, private formBuilder:FormBuilder){
    this.editarBanner=this.formBuilder.group(
      {
        id:[''],
        name:[''],
        address:[''],
        post:[''],
        profile_img:[''],
        banner_img:[''],
        linkedin:[''],
        instagram:[''],
        about:['']
      }
    )
  }

  recargarDatos() {
    this.datosBanner.obtenerDatos().subscribe(data => {
      this.banner=data[0];
    });
    this.datosEducacion.obtenerDatos().subscribe(data => {
      this.educaciones=data;
    })
  }

  ngOnInit(): void {
    this.recargarDatos();   
  }

  modificar() {
    let banner:any = this.banner;
    this.configurarForm(banner);
  }

  private configurarForm(perso:any) {
    this.editarBanner.setValue({
      id:perso.id,
      name:perso.name,
      address:perso.address,
      post:perso.post,
      profile_img:perso.profile_img,
      banner_img:perso.banner_img,
      linkedin:perso.linkedin,
      instagram:perso.instagram,
      about:perso.about
    })
  }
  
  guardarBanner(form:any): void {
    this.datosBanner.editarDatos(form).subscribe(data => {
      console.log("Banner modificado correctamente")
      this.recargarDatos();
    });
  }
}
