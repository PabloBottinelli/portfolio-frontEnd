import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { EducationService } from 'src/app/services/education.service';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit{
  educations:any;
  editarEducacion:FormGroup;
  isUserLogged:boolean = false;

  constructor(private datosEducacion:EducationService, private formBuilder:FormBuilder, private autenticacionService:AutenticacionService){
    this.editarEducacion=this.formBuilder.group(
      {
        id:[''],
        institution:['', [Validators.required]],
        img:['', [Validators.required]],
        title:['', [Validators.required]],
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

  get Institution(){
    return this.editarEducacion.get('institution');
  }

  get Img(){
    return this.editarEducacion.get('img');
  }

  get Title(){
    return this.editarEducacion.get('title');
  }

  get Desde(){
    return this.editarEducacion.get('desde');
  }

  get Hasta(){
    return this.editarEducacion.get('hasta');
  }

  recargarDatos() {
    this.datosEducacion.obtenerDatos().subscribe(data => {
      this.educations=data;
    });
    this.isUserLogged = this.autenticacionService.isUserLogged();
  }

  ngOnInit(): void {
    this.recargarDatos();   
  }

  modificar(index: number) {
    let educacion:any = this.educations.find((obj:any) => obj.id === index);
    this.configurarForm(educacion);
  }

  private configurarForm(ed:any) {
    this.editarEducacion.setValue({
      id:ed.id,
      institution:ed.institution,
      img:ed.img,
      title:ed.title,
      desde:ed.desde,
      hasta:ed.hasta
    })
  }

  vaciar() {
    this.vaciarForm();
  }

  private vaciarForm() {
    this.editarEducacion.setValue({
      id: '',
      institution: '',
      img: '',
      title: '',
      desde: '',
      hasta: ''
    })
  }

  guardarEducacion(form:any): void {
    this.datosEducacion.editarDatos(form).subscribe(data => {
      console.log("Educación modificada correctamente")
      this.recargarDatos();
    });
  }

  crearEducacion(form:any): void{
    this.datosEducacion.guardarDatos(form).subscribe(data =>{
      console.log("Educación creada correctamente")
      this.recargarDatos();
    });
  }

  borrarEducacion(id:number):void{
    this.datosEducacion.borrarDatos(id).subscribe(data =>{
      console.log("Educación borrada correctamente")
      this.recargarDatos();
    });
  }
}
