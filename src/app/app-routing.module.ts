import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DeportesComponent } from './deportes/deportes.component';
import { EncuentrosComponent } from './encuentros/encuentros.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { HttpClientModule } from '@angular/common/http';
import { DeporteDetailsComponent } from './deporte-details/deporte-details.component';
import { EquipoDetailsComponent } from './equipo-details/equipo-details.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioDetailsComponent } from './usuario-details/usuario-details.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EncuentroDetailsComponent } from './encuentro-details/encuentro-details.component';
import { FixturesComponent } from './fixtures/fixtures.component';
import { ProfileComponent } from './profile/profile.component';
import { AuditComponent } from './audit/audit.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { PosicionesComponent } from './posiciones/posiciones.component';
import { ListadosComponent } from './listados/listados.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'deportes/:id', component: DeporteDetailsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'deportes', component: DeportesComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'equipos/:id', component: EquipoDetailsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'encuentros', component: EncuentrosComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'encuentros/:id', component: EncuentroDetailsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'usuarios/:nombreUsuario', component: UsuarioDetailsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'fixtures', component: FixturesComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'posiciones', component: PosicionesComponent, canActivate: [AuthGuard] },
  { path: 'listados', component: ListadosComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'perfil', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'auditoria', component: AuditComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'calendario', component: CalendarComponent, canActivate: [AuthGuard] },
  { path: 'comentarios/:encuentroId', component: ComentariosComponent, canActivate: [AuthGuard] },
  { path: 'comentarios', component: ComentariosComponent, canActivate: [AuthGuard] },
  { path: 'no-autorizado', component: UnauthorizedComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports: [RouterModule],
  providers: [AuthGuard, AdminGuard],
})
export class AppRoutingModule { }
