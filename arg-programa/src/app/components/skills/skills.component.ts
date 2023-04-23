import { Component, OnInit } from '@angular/core';
import { SkillsService } from 'src/app/services/skills.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

function esPorcentaje(control: AbstractControl): { [key: string]: any } | null {
  for(let i = 0; i<=100 ; i++){
    let porcentaje = (i + '%').toString();
    if(control.value == porcentaje){
      return null;  
    }
  }
  if(control.value == ''){
    return null;
  }
  return { esPorcentajeInvalido: true };
}

function esClaseBoot(control: AbstractControl): { [key: string]: any } | null {
  switch (control.value) {
    case 'bg-success':
      return null;
    case 'bg-warning':
      return null;
    case 'azul':
      return null;
    case 'bg-danger':
      return null;
    case '':
      return null;
    default:
      return { esClaseBootInvalida: true };
  }
}

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit{
  skills:any;
  editarSkill:FormGroup;
  isUserLogged:boolean = false;

  constructor(private datosSkills:SkillsService, private formBuilder:FormBuilder, private autenticacionService:AutenticacionService){
    this.editarSkill=this.formBuilder.group(
      {
        id:[''],
        name:['', [Validators.required]],
        width:['', [Validators.required, esPorcentaje]],
        color:['', [esClaseBoot]]
      }
    )
  } 

  get Name(){
    return this.editarSkill.get('name');
  }

  get Width(){
    return this.editarSkill.get('width');
  }

  get Color(){
    return this.editarSkill.get('color');
  }

  recargarDatos() {
    this.datosSkills.obtenerDatos().subscribe(data => {
      this.skills=data;
    });
    this.isUserLogged = this.autenticacionService.isUserLogged();
  }

  ngOnInit(): void {
    this.recargarDatos();   
  }

  modificar(index: number) {
    let skill:any = this.skills.find((obj:any) => obj.id === index);
    this.configurarForm(skill);
  }

  private configurarForm(skill:any) {
    this.editarSkill.setValue({
      id: skill.id,
      name: skill.name,
      width: skill.width,
      color: skill.color
    })
  }
  vaciar() {
    this.vaciarForm();
  }

  private vaciarForm() {
    this.editarSkill.setValue({
      id: '',
      name: '',
      width: '',
      color: ''
    })
  }

  guardarSkill(form:any): void {
    this.datosSkills.editarDatos(form).subscribe(data => {
      console.log("Skill modificada correctamente")
      this.recargarDatos();
    });
  }

  crearSkill(form:any): void{
    this.datosSkills.guardarDatos(form).subscribe(data =>{
      console.log("Skill creada correctamente")
      this.recargarDatos();
    });
  }

  borrarSkill(id:number):void{
    this.datosSkills.borrarDatos(id).subscribe(data =>{
      console.log("Skill borrada correctamente")
      this.recargarDatos();
    });
  }
}
