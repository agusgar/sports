import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { Observable } from 'rxjs';
import { Encuentro } from '../entities/encuentro';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { EncuentroEdit } from '../entities/encuentroEdit';
import { EncuentroDetail } from '../entities/encuentroDetail';
import { EncuentroResultado } from '../entities/encuentroResultado';



@Injectable({
  providedIn: 'root'
})
export class EncuentroService {
  private url = `${environment.baseUrl}/api/encuentro`;

  constructor(private http: HttpClient) { }

  addEncuentro(encuentro: EncuentroEdit) {
    return this.http.post(this.url, encuentro, { responseType: 'text' });
  }

  getAmountForDeporteByPeriod(deporteId: number, year: number, month: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.url}/ListarEncuentrosPorFechaYDeporte/${deporteId}/${year}/${month}`);
  }
  getEncuentrosPorDeporte(deporteId: number): Observable<EncuentroEdit[]> {
    return this.http.get<EncuentroEdit[]>(`${this.url}/ListarEncuentrosParaDeporte/${deporteId}`);
  }
  getEncuentrosPorEquipo(equipoId: number): Observable<EncuentroEdit[]> {
    return this.http.get<EncuentroEdit[]>(`${this.url}/ListarEncuentrosParaEquipo/${equipoId}`);
  }
  getEncuentro(encuentroId: number): Observable<EncuentroDetail> {
    return this.http.get<EncuentroDetail>(`${this.url}/${encuentroId}`);
  }

  getEncuentros(): Observable<Encuentro[]> {
    return this.http.get<Encuentro[]>(this.url);
  }

  changeEncuentro(id: number, encuentro: EncuentroEdit) {
    return this.http.put(this.url, encuentro, { responseType: 'text' });
  }

  deleteEncuentro(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  getEncuentrosByDateAndDeporte(date: Date, deporteId: number): Observable<EncuentroEdit[]> {
    return this.http.get<EncuentroEdit[]>(`${this.url}/ListarEncuentrosPorFechaYDeporte/${deporteId}/${format(date, 'YYYY-MM-DD')}`);
  }

  addResult(result: EncuentroResultado) {
    return this.http.post(`${this.url}/AgregarResultado`, result, { responseType: 'text' });
  }
}
