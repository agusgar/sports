import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { DeportesComponent } from '../deportes/deportes.component';
import { Auth } from '../entities/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [AuthService],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.authService.logout();
    }
  }

  login(): void {
    this.loadingService.setLoading(true);
    if (this.username && this.password) {
      this.authService.login({ nombreUsuario: this.username, clave: this.password }).subscribe(
        (auth: Auth) => {
          if (auth.esAdmin) {
            this.router.navigateByUrl('/encuentros');
          } else {
            this.router.navigateByUrl('/comentarios');
          }
          this.loadingService.setLoading(false);
        },
        (data) => {
          this.loadingService.setLoading(false);
        },
      );
    }
  }
}
