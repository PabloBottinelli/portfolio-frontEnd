import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BannerAboutService {

  constructor(private http:HttpClient) { }

  obtenerDatos():Observable<any>{
    return this.http.get('http://localhost:8080/personas/traer');
  }

  editarDatos(form:any):Observable<any>{
    return this.http.put('http://localhost:8080/personas/editar', form);
  }
}
