
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpErrorResponse, HttpResponse, HttpEventType } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { SpinnerService } from '../services/spinner.service';
import { finalize, catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ActionAlertComponent } from '../action-alert/action-alert.component';
import { AlertType } from '../action-alert/action-alert-type';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private spinnerService: SpinnerService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.initRequest();
    return next.handle(req).pipe(
      map(event => {
        if (event instanceof HttpResponse) {
          const { body, status, type } = event;
          if (status === 200 && ['POST', 'PUT', 'DELETE'].includes(req.method)) {
            this.snackBar.openFromComponent(ActionAlertComponent, {
              data: {
                message: event.url.includes('/api/login') ? `Hola ${req.body.nombreUsuario}` : body,
                type: AlertType.Success,
              },
              duration: 3000,
              panelClass: 'action-alert-panel',
            });
          }
        }
        return event;
      }),
      catchError(errorResponse => {
        if (errorResponse instanceof HttpErrorResponse) {
          const { error, status } = errorResponse;
          switch (status) {
            case 400: {
              if (error === 'No existe usuario para el token enviado') {
                this.router.navigateByUrl('/login');
              } else {
                this.snackBar.openFromComponent(ActionAlertComponent, {
                  data: {
                    message: error,
                    type: AlertType.Error,
                  },
                  duration: 10000,
                  panelClass: 'action-alert-panel',
                });
              }
              break;
            }
            case 0: {
              let data;
              if (this.router.url === '/login') {
                data = {
                  message: `Surgio un error de inesperado.
                    Intente nuevamente mas tarde.
                    Si el problema persiste comuniquese con el administrador del sistema.`,
                  type: AlertType.Error,
                };
              } else {
                data = {
                  links: [
                    { href: '/login', text: 'Volver a autenticarse' },
                  ],
                  message: 'Surgio un error de inesperado',
                  type: AlertType.Error,
                };
              }

              this.snackBar.openFromComponent(ActionAlertComponent, {
                data,
                duration: 10000,
                panelClass: 'action-alert-panel',
              });
            }
          }
        }
        return observableThrowError(errorResponse);
      }),
      finalize(() => {
        this.spinnerService.finishRequest();
      })
    );
  }
}
