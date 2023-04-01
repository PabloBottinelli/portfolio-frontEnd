import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(private http:HttpClient) { }

  obtenerDatos():Observable<any>{
    return this.http.get('http://localhost:8080/skills/traer');
  }

  editarDatos(form:any):Observable<any>{
    return this.http.put('http://localhost:8080/skills/editar', form);
  }

  guardarDatos(form:any):Observable<any>{
    return this.http.post('http://localhost:8080/skills/crear', form)
  }

  borrarDatos(id:number):Observable<any>{
    const url = `http://localhost:8080/skills/borrar/${id}`;
    return this.http.delete(url);
  }
}
