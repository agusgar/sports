import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Log } from '../entities/log';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private url = `${environment.baseUrl}/api/log`;

  constructor(private http: HttpClient) { }

  getLogsEntreFechas(fechaDesde: Date, fechaHasta: Date): Observable<Log[]> {
    return this.http.get<Log[]>(`${this.url}/VisualizarLog/${format(fechaDesde, 'YYYY-MM-DD')}/${format(fechaHasta, 'YYYY-MM-DD')}`);
  }
}
