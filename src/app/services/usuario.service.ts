import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Usuario } from '../entities/usuario';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsuarioEdit } from '../entities/usuarioEdit';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = `${environment.baseUrl}/api/usuario`;

  constructor(private http: HttpClient) { }

  addUsuario(usuario: Usuario) {
    return this.http.post(this.url, usuario, { responseType: 'text' });
  }
  getUsuario(nombreUsuario: string): Observable<UsuarioEdit> {
    return this.http.get<UsuarioEdit>(`${this.url}/${nombreUsuario}`);
  }
  deleteUsuario(nombreUsuario: string) {
    return this.http.delete(`${this.url}/${nombreUsuario}`, { responseType: 'text' });
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url);
  }
  changeUsuario(usuario: UsuarioEdit) {
    return this.http.put(this.url, usuario, { responseType: 'text' });
  }
}
