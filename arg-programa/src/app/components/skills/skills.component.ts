import { Component, OnInit } from '@angular/core';
import { SkillsService } from 'src/app/services/skills.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

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
        name:[''],
        width:[''],
        color:['']
      }
    )
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
