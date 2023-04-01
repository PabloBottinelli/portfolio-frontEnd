import { Component, OnInit } from '@angular/core';
import { BannerAboutService } from 'src/app/services/banner-about.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit{
  banner:any;
  editarAbout:FormGroup;

  constructor(private datosBanner:BannerAboutService, private formBuilder:FormBuilder){
    this.editarAbout=this.formBuilder.group(
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
  }

  ngOnInit(): void {
    this.recargarDatos();   
  }

  modificar() {
    let banner:any = this.banner;
    this.configurarForm(banner);
  }

  private configurarForm(perso:any) {
    this.editarAbout.setValue({
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
  
  guardarAbout(form:any): void {
    this.datosBanner.editarDatos(form).subscribe(data => {
      console.log("About modificado correctamente")
      this.recargarDatos();
    });
  }
}
