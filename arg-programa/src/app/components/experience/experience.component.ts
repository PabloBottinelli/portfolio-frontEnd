import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExperienceService } from 'src/app/services/experience.service';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})

export class ExperienceComponent implements OnInit{
  experiences:any;
  editarExperiencia:FormGroup;
  isUserLogged:boolean = false;

  constructor(private datosExp:ExperienceService, private formBuilder:FormBuilder, private autenticacionService:AutenticacionService){
    this.editarExperiencia=this.formBuilder.group(
      {
        id:[''],
        company:[''],
        img:[''],
        post:[''],
        dates:['']
      }
    )
  }

  recargarDatos() {
    this.datosExp.obtenerDatos().subscribe(data => {
      this.experiences=data;
    });
    this.isUserLogged = this.autenticacionService.isUserLogged();
  }

  ngOnInit(): void {
    this.recargarDatos();   
  }

  modificar(index: number) {
    let experience:any = this.experiences.find((obj:any) => obj.id === index);
    this.configurarForm(experience);
  }

  private configurarForm(exp:any) {
    this.editarExperiencia.setValue({
      id:exp.id,
      company:exp.company,
      img:exp.img,
      post:exp.post,
      dates:exp.dates
    })
  }

  vaciar() {
    this.vaciarForm();
  }

  private vaciarForm() {
    this.editarExperiencia.setValue({
      id: '',
      company: '',
      img: '',
      post: '',
      dates:''
    })
  }

  guardarExperiencia(form:any): void {
    this.datosExp.editarDatos(form).subscribe(data => {
      console.log("Experiencia modificada correctamente")
      this.recargarDatos();
    });
  }

  crearExperiencia(form:any): void{
    this.datosExp.guardarDatos(form).subscribe(data =>{
      console.log("Experiencia creada correctamente")
      this.recargarDatos();
    });
  }

  borrarExperiencia(id:number):void{
    this.datosExp.borrarDatos(id).subscribe(data =>{
      console.log("Experiencia borrada correctamente")
      this.recargarDatos();
    });
  }
}
