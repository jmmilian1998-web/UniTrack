import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private apiUrl = 'http://localhost:3000/api/estudiantes';

  constructor(private http: HttpClient) { }

  getEstudiantes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  registrarEstudiante(estudiante: any): Observable<any> {
    return this.http.post(this.apiUrl, estudiante);
  }

  invertirLista(): Observable<any> {
    return this.http.post(`${this.apiUrl}/invertir`, {});
  }

  getHistorial(carnet: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${carnet}/historial`);
  }

  ordenarHistorial(carnet: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${carnet}/historial/ordenado`);
  }
}