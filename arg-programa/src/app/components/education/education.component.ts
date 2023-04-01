import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit{
  educations:any;
  editarEducacion:FormGroup;
  constructor(private datosEducacion:EducationService, private formBuilder:FormBuilder){
    this.editarEducacion=this.formBuilder.group(
      {
        id:[''],
        institution:[''],
        img:[''],
        title:[''],
        dates:['']
      }
    )
  }
  recargarDatos() {
    this.datosEducacion.obtenerDatos().subscribe(data => {
      this.educations=data;
    });
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
      dates:ed.dates
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
      dates: ''
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
