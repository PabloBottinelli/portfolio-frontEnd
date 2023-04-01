import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AutenticacionService {
  userLogin:any = false;
  constructor(private http:HttpClient) { }

  login(username: string, password: string):Observable<boolean>{
    return this.userLogin = this.http.post<any>('http://localhost:8080/user/login', { user: username, password: password });
  }

  estaLogueado():Observable<boolean>{
    console.log(this.userLogin);
    return this.userLogin;
  }

}
