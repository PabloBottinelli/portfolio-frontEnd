import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectsService {

  constructor(private http:HttpClient) { }

  obtenerDatos():Observable<any>{
    return this.http.get('http://localhost:8080/proyectos/traer');
  }

  editarDatos(form:any):Observable<any>{
    return this.http.put('http://localhost:8080/proyectos/editar', form);
  }

  guardarDatos(form:any):Observable<any>{
    return this.http.post('http://localhost:8080/proyectos/crear', form)
  }

  borrarDatos(id:number):Observable<any>{
    const url = `http://localhost:8080/proyectos/borrar/${id}`;
    return this.http.delete(url);
  }
}
