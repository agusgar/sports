import { Component, OnInit } from '@angular/core';
import { Encuentro } from '../entities/encuentro';
import { EncuentroService } from '../services/encuentro.service';
import { ComentarioService } from '../services/comentario.service';
import { Comentario } from '../entities/comentario';
import { forkJoin } from 'rxjs';
import { EncuentroDetail } from '../entities/encuentroDetail';
import { EquipoService } from '../services/equipo.service';
import { EquipoEdit } from '../entities/equipoEdit';
import { DeporteService } from '../services/deporte.service';
import { Deporte } from '../entities/deporte';
import { AuthService } from '../services/auth.service';
import { EquipoDetail } from '../entities/equipoDetail';
import { AlertType } from '../action-alert/action-alert-type';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss']
})
export class ComentariosComponent implements OnInit {
  encuentros: Encuentro[];
  selectedEncuentroId: number;
  comentarios: Comentario[];
  commentText = '';
  equipos: EquipoEdit[];
  followedEquipos: EquipoDetail[];
  deportes: Deporte[];
  type = AlertType;
  noEncuentrosForUser = `No se encontraron encuentros sobre los cuales comentar.
    Puede dirigirse a su perfil de usuario en donde puede seguir mas equipos.`;
  noEncuentros = false;

  constructor(
    private encuentrosService: EncuentroService,
    private comentarioService: ComentarioService,
    private equipoService: EquipoService,
    private deporteService: DeporteService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.getEncuentros();
  }

  get encuentro(): EncuentroDetail {
    return this.encuentros.find(encuentro => encuentro.id === this.selectedEncuentroId);
  }

  get deporte(): Deporte {
    return this.deportes.find(deporte => deporte.id === this.equipos[0].deporteId);
  }

  get comentariosEncuentro(): Comentario[] {
    return this.comentarios.filter(comentario => comentario.idEncuentro === this.selectedEncuentroId);
  }

  isEncuentroSelected(encuentro: EncuentroDetail): boolean {
    return encuentro.id === this.selectedEncuentroId;
  }

  getEncuentros(): void {
    this.encuentrosService.getEncuentros().subscribe(encuentros => {
      this.encuentros = encuentros.sort((a: Encuentro, b: Encuentro) => a.fechaYHora > b.fechaYHora ? 1 : -1);

      this.comentarioService.getComentarios().subscribe(response => this.comentarios = response);
      this.deporteService.getDeportes().subscribe(result => this.deportes = result);

      this.equipoService.getFollowedEquipos().subscribe(result => {
        this.followedEquipos = result;
        const selectedEncuentro = this.encuentros
          .find(encuentro => encuentro.idEquipos
            .some(id => this.followedEquipos
              .some(followedEquipo => followedEquipo.id === id)));
        this.selectedEncuentroId = selectedEncuentro ? selectedEncuentro.id : null;

        if (this.selectedEncuentroId !== null) {
          const equipos$ = this.encuentro.idEquipos.map(id => this.equipoService.getEquipo(id));
          forkJoin(equipos$).subscribe((equipos) => this.equipos = equipos);
        } else {
          this.noEncuentros = true;
        }
      });
    });
  }

  onSelectEncuentro(encuentro: Encuentro): void {
    this.selectedEncuentroId = encuentro.id;

    const equipos$ = this.encuentro.idEquipos.map(id => this.equipoService.getEquipo(id));
    forkJoin(equipos$).subscribe((equipos) => this.equipos = equipos);
  }

  onSubmit(): void {
    this.comentarioService.addComentario({
      idEncuentro: this.selectedEncuentroId,
      texto: this.commentText,
      nombreUsuario: this.authService.getUsername(),
    }).subscribe(response => {
      this.comentarioService.getComentarios().subscribe(comentarios => this.comentarios = comentarios);
    });
  }
}
