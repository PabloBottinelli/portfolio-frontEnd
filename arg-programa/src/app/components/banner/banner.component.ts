import { Component, OnInit } from '@angular/core';
import { BannerAboutService } from 'src/app/services/banner-about.service';
import { EducationService } from 'src/app/services/education.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})

export class BannerComponent implements OnInit{
  banner:any;
  educaciones:any;
  editarBanner:FormGroup;
  isUserLogged:boolean = false;

  constructor(private datosBanner:BannerAboutService, private datosEducacion:EducationService, private formBuilder:FormBuilder, private autenticacionService:AutenticacionService){
    this.editarBanner=this.formBuilder.group(
      {
        id:[''],
        name:['', [Validators.required]],
        address:['', [Validators.required]],
        post:['', [Validators.required]],
        profile_img:['', [Validators.required]],
        banner_img:['', [Validators.required]],
        linkedin:['', [Validators.required]],
        instagram:['', [Validators.required]],
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
    this.isUserLogged = this.autenticacionService.isUserLogged();
  }

  ngOnInit(): void {
    this.recargarDatos();   
  }

  get Name(){
    return this.editarBanner.get('name');
  }

  get Address(){
    return this.editarBanner.get('address');
  }

  get Post(){
    return this.editarBanner.get('post');
  }

  get Profile_img(){
    return this.editarBanner.get('profile_img');
  }

  get Banner_img(){
    return this.editarBanner.get('banner_img');
  }

  get Linkedin(){
    return this.editarBanner.get('linkedin');
  }

  get Instagram(){
    return this.editarBanner.get('instagram');
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
