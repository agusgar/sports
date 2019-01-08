import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { EquipoEdit } from '../entities/equipoEdit';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EquipoDetail } from '../entities/equipoDetail';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  private url = `${environment.baseUrl}/api/equipo`;

  constructor(private http: HttpClient) { }

  addEquipo(equipo: EquipoEdit) {
    return this.http.post(this.url, equipo, { responseType: 'text' });
  }

  deleteEquipo(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  getEquipo(id: number): Observable<EquipoEdit> {
    return this.http.get<EquipoEdit>(`${this.url}/${id}`);
  }

  changeEquipo(id: number, equipo: EquipoEdit) {
    return this.http.put(this.url, equipo, { responseType: 'text' });
  }

  getFollowedEquipos(): Observable<EquipoDetail[]> {
    return this.http.get<EquipoDetail[]>(`${this.url}/ListarEquiposSeguidosUsuario`);
  }

  followEquipos(ids: number[]) {
    return this.http.put(`${this.url}/SeguirEquipo`, { idEquipos: ids }, { responseType: 'text' });
  }

  unFollowEquipo(ids: number[]) {
    return this.http.put(`${this.url}/DejarDeSeguirEquipos`, { idEquipos: ids }, { responseType: 'text' });
  }
}
