import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userLogged:any;
  form:FormGroup;
  constructor(private formBuilder:FormBuilder, private autenticacionService:AutenticacionService){
    this.form=this.formBuilder.group(
      {
        username:['',[Validators.required]],
        password:['',[Validators.required, Validators.minLength(8)]],
      }
    )
  }
  recargarDatos() {
    this.autenticacionService.estaLogueado().subscribe(data =>{
      this.userLogged = data;
    })
  }
  ngOnInit(): void {
    this.recargarDatos();
  }

  get Username(){
    return this.form.get('username');
  }

  get Password(){
    return this.form.get('password');
  }

  onSubmit(){
    this.autenticacionService.login(this.Username?.value, this.Password?.value).subscribe(data=>{
      this.userLogged=data;
      console.log(this.userLogged);
      this.recargarDatos();
    })
  }
  
}
