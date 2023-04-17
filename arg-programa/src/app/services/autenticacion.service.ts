import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AutenticacionService {
  constructor(private http:HttpClient) { }

  login(username: string, password: string): Observable<Boolean>{
    return this.http.post<Boolean>('http://localhost:8080/user/login', { user: username, password: password }).pipe(
     tap((response: Boolean) => { 
      if (response){localStorage.setItem("auth", "valido"); }     
      console.log('login ', localStorage.getItem('auth'))
      })
    );
  }

  public logout() {
    localStorage.removeItem("auth");
    console.log('logout service ', localStorage.getItem('auth'))
  }
    
  public isUserLogged():boolean {
    console.log('isUserLogged service ', localStorage.getItem("auth") !== null)
    return localStorage.getItem("auth") !== null;
  }
}
