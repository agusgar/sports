import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Comentario } from '../entities/comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private url = `${environment.baseUrl}/api/comentario`;

  constructor(private http: HttpClient) { }

  getComentarios(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.url}/ComentariosDeEncuentroDeFavoritos`);
  }

  addComentario(comentario: Comentario) {
    return this.http.post(this.url, comentario, { responseType: 'text' });
  }
}
