import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form:FormGroup;
  isUserLogged:boolean = false;
  constructor(private formBuilder:FormBuilder, private autenticacionService:AutenticacionService){
    this.form=this.formBuilder.group(
      {
        username:['',[Validators.required]],
        password:['',[Validators.required, Validators.minLength(8)]],
      }
    )
  }

  ngOnInit(): void {
    this.isUserLogged = this.autenticacionService.isUserLogged();
  }

  get Username(){
    return this.form.get('username');
  }

  get Password(){
    return this.form.get('password');
  }

  onSubmit(){
    this.autenticacionService.login(this.Username?.value, this.Password?.value).subscribe(data => {
      location.reload();
    });
  }
}
