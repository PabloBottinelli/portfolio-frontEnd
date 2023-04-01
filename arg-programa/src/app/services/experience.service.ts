import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  constructor(private http:HttpClient) { }

  obtenerDatos():Observable<any>{
    return this.http.get('http://localhost:8080/experiencias/traer');
  }

  editarDatos(form:any):Observable<any>{
    return this.http.put('http://localhost:8080/experiencias/editar', form);
  }

  guardarDatos(form:any):Observable<any>{
    return this.http.post('http://localhost:8080/experiencias/crear', form)
  }

  borrarDatos(id:number):Observable<any>{
    const url = `http://localhost:8080/experiencias/borrar/${id}`;
    return this.http.delete(url);
  }
}
