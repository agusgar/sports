import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import localeEsUy from '@angular/common/locales/es-UY';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { AppMaterialModulesModule } from './app-material-modules.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingComponent } from './loading/loading.component';
import { DeportesComponent } from './deportes/deportes.component';
import { AuthService } from './services/auth.service';
import { EncuentrosComponent } from './encuentros/encuentros.component';
import { registerLocaleData } from '@angular/common';
import { ConfirmComponent } from './confirm/confirm.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { DeporteDetailsComponent } from './deporte-details/deporte-details.component';
import { EquipoEditComponent } from './equipo-edit/equipo-edit.component';
import { EquipoDetailsComponent } from './equipo-details/equipo-details.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioDetailsComponent } from './usuario-details/usuario-details.component';
import { UsuarioEditComponent } from './usuario-edit/usuario-edit.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EncuentroEditComponent } from './encuentro-edit/encuentro-edit.component';
import { CalendarCellComponent } from './calendar-cell/calendar-cell.component';
import { EncuentrosAtDayComponent } from './encuentros-at-day/encuentros-at-day.component';
import { EncuentroDetailsComponent } from './encuentro-details/encuentro-details.component';
import { ActionAlertComponent } from './action-alert/action-alert.component';
import { FixturesComponent } from './fixtures/fixtures.component';
import { ProfileComponent } from './profile/profile.component';
import { AuditComponent } from './audit/audit.component';
import { FixtureExecutionComponent } from './fixture-execution/fixture-execution.component';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ComentarioComponent } from './comentario/comentario.component';
import { EncuentrosFavoritosPipe } from './pipes/encuentros-favoritos.pipe';
import { ComentariosEncuentroPipe } from './pipes/comentarios-encuentro.pipe';
import { ResultadoEditComponent } from './resultado-edit/resultado-edit.component';
import { AlertComponent } from './alert/alert.component';
import { NombreEquipoPipe } from './pipes/nombre-equipo.pipe';
import { PosicionesComponent } from './posiciones/posiciones.component';
import { DeporteEditComponent } from './deporte-edit/deporte-edit.component';
import { ListadosComponent } from './listados/listados.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

registerLocaleData(localeEsUy, 'es');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoadingComponent,
    DeportesComponent,
    EncuentrosComponent,
    ConfirmComponent,
    SpinnerComponent,
    DeporteDetailsComponent,
    EquipoEditComponent,
    EquipoDetailsComponent,
    UsuariosComponent,
    UsuarioDetailsComponent,
    CalendarComponent,
    EncuentroEditComponent,
    CalendarCellComponent,
    EncuentrosAtDayComponent,
    EncuentroDetailsComponent,
    ActionAlertComponent,
    FixturesComponent,
    ProfileComponent,
    AuditComponent,
    FixtureExecutionComponent,
    ComentariosComponent,
    UsuarioEditComponent,
    PageNotFoundComponent,
    ComentarioComponent,
    EncuentrosFavoritosPipe,
    ComentariosEncuentroPipe,
    ResultadoEditComponent,
    AlertComponent,
    NombreEquipoPipe,
    PosicionesComponent,
    DeporteEditComponent,
    ListadosComponent,
    UnauthorizedComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppMaterialModulesModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: 'es',
    },
    AuthService,
    EncuentrosFavoritosPipe,
  ],
  entryComponents: [
    ConfirmComponent,
    UsuarioEditComponent,
    EquipoEditComponent,
    DeporteEditComponent,
    EncuentroEditComponent,
    EncuentrosAtDayComponent,
    ActionAlertComponent,
    FixtureExecutionComponent,
    ResultadoEditComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
