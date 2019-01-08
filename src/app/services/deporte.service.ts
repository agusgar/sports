import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Deporte } from '../entities/deporte';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { EquipoDetail } from '../entities/equipoDetail';
import { Posicion } from '../entities/posicion';


@Injectable({
  providedIn: 'root'
})
export class DeporteService {
  private url = `${environment.baseUrl}/api/deporte`;

  constructor(private http: HttpClient) { }

  getDeportes(): Observable<Deporte[]> {
    return this.http.get<Deporte[]>(this.url);
  }

  deleteDeporte(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  getDeporte(id: number): Observable<Deporte> {
    return this.http.get<Deporte>(`${this.url}/${id}`);
  }

  getEquipos(id: number, order: string = 'asc'): Observable<EquipoDetail[]> {
    return this.http.get<EquipoDetail[]>(`${this.url}/${id}/equipo/${order}`);
  }
  getPosiciones(id: number): Observable<Posicion[]> {
    return this.http.get<Posicion[]>(`${this.url}/ObtenerPosiciones/${id}`);
  }
  addDeporte(deporte: Deporte) {
    return this.http.post(this.url, deporte, { responseType: 'text' });
  }

 changeDeporte(deporte: Deporte) {
    return this.http.put(this.url, deporte, { responseType: 'text' });
  }
}
