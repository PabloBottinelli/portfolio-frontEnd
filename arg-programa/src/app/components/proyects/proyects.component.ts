import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProyectsService } from 'src/app/services/proyects.service';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.css']
})
export class ProyectsComponent implements OnInit{
  proyects:any;
  editarProyecto:FormGroup;
  isUserLogged:boolean = false;

  constructor(private datosProy:ProyectsService, private formBuilder:FormBuilder, private autenticacionService:AutenticacionService){
    this.editarProyecto=this.formBuilder.group(
      {
        id:[''],
        name:['', [Validators.required]],
        description:['', [Validators.required]],
        link:['', [Validators.required]]
      }
    )
  }

  get Name(){
    return this.editarProyecto.get('name');
  }

  get Description(){
    return this.editarProyecto.get('description');
  }

  get Link(){
    return this.editarProyecto.get('link');
  }

  recargarDatos() {
    this.datosProy.obtenerDatos().subscribe(data => {
      this.proyects=data;
    });
    this.isUserLogged = this.autenticacionService.isUserLogged();
  }

  ngOnInit(): void {
    this.recargarDatos();   
  }

  modificar(index: number) {
    let proyect:any = this.proyects.find((obj:any) => obj.id === index);
    this.configurarForm(proyect);
  }

  private configurarForm(proy:any) {
    this.editarProyecto.setValue({
      id: proy.id,
      name: proy.name,
      description: proy.description,
      link: proy.link
    })
  }

  vaciar() {
    this.vaciarForm();
  }

  private vaciarForm() {
    this.editarProyecto.setValue({
      id: '',
      name: '',
      description: '',
      link: ''
    })
  }

  guardarProyecto(form:any): void {
    this.datosProy.editarDatos(form).subscribe(data => {
      console.log("Proyecto modificado correctamente")
      this.recargarDatos();
    });
  }

  crearProyecto(form:any): void{
    this.datosProy.guardarDatos(form).subscribe(data =>{
      console.log("Proyecto creado correctamente")
      this.recargarDatos();
    });
  }

  borrarProyecto(id:number):void{
    this.datosProy.borrarDatos(id).subscribe(data =>{
      console.log("Proyecto borrado correctamente")
      this.recargarDatos();
    });
  }
}
