import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
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
        company:['', [Validators.required]],
        img:['', [Validators.required]],
        post:['', [Validators.required]],
        desde:['', [Validators.required, this.validarDesde()]],
        hasta:['', [Validators.required, this.validarHasta()]]
      }
    )
  }

  validarDesde(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const desde = control.value;
      const hasta = control.parent?.get('hasta')?.value;
      const now = new Date();
      const currentYear = now.getFullYear();
      if (!hasta) {
        return null;
      }
      if(hasta < desde){
        return { 'desdeMayorHasta': true };
      }else if(hasta > currentYear){
        return { mayorAFechaActual: true }; 
      }else{
        return null;
      }
    }
  }

  validarHasta(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const desde = control.parent?.get('desde')?.value;
      const hasta = control.value;
      const now = new Date();
      const currentYear = now.getFullYear();
      if(hasta < desde) {
        return { 'hastaMenorDesde': true };
      }else if(hasta > currentYear){
        return { mayorAFechaActual: true };            
      }else{
        return null;
      }
    }
  }

  get Company(){
    return this.editarExperiencia.get('company');
  }
  
  get Img(){
    return this.editarExperiencia.get('img');
  }

  get Post(){
    return this.editarExperiencia.get('post');
  }

  get Desde(){
    return this.editarExperiencia.get('desde');
  }

  get Hasta(){
    return this.editarExperiencia.get('hasta');
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
      desde:exp.desde,
      hasta:exp.hasta
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
      desde:'',
      hasta: ''
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
