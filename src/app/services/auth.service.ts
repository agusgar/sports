import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Auth } from '../entities/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Login } from '../entities/login';

export const TOKEN_NAME = 'jwt_token';
export const USERNAME = 'username';
export const IS_ADMIN_NAME = 'is_admin';

@Injectable()
export class AuthService {

  private url = `${environment.baseUrl}/api/login`;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }

  getUsername(): string {
    return localStorage.getItem(USERNAME);
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  isAdmin(): boolean {
    return localStorage.getItem(IS_ADMIN_NAME) === 'true';
  }

  setUsername(username): void {
    localStorage.setItem(USERNAME, username);
  }

  setToken(token): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  setIsAdmin(isAdmin): void {
    localStorage.setItem(IS_ADMIN_NAME, isAdmin);
  }

  isAuthenticated(token?: string): boolean {
    if (!token) {
      token = this.getToken();
    }
    return token != null;
  }

  isNotAuthenticated(token?: string): boolean {
    return !this.isAuthenticated(token);
  }

  login(login: Login): Observable<Auth> {
    return this.http.post<Auth>(this.url, login, { headers: this.headers })
      .pipe(map((result: Auth) => {
        this.setUsername(login.nombreUsuario);
        this.setToken(result.token);
        this.setIsAdmin(result.esAdmin);
        return result;
      }));
  }

  logout() {
    localStorage.removeItem(TOKEN_NAME);
    this.router.navigateByUrl('/login');
  }
}
