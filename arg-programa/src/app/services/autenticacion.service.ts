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
      if (response){sessionStorage.setItem("auth", "valido"); }     
      })
    );
  }

  public logout() {
    sessionStorage.removeItem("auth");
  }
    
  public isUserLogged():boolean {
    return sessionStorage.getItem("auth") !== null;
  }
}
