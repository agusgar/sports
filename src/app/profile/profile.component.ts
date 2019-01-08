import { Component, OnInit } from '@angular/core';
import { Deporte } from '../entities/deporte';
import { DeporteService } from '../services/deporte.service';
import { forkJoin } from 'rxjs';
import { EquipoService } from '../services/equipo.service';
import { EquipoDetail } from '../entities/equipoDetail';
import { some, isEmpty, isNil } from 'lodash';
import { AlertType } from '../action-alert/action-alert-type';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  deportes: Deporte[];
  selectedDeporteId: number;
  equipos: EquipoDetail[];
  followedEquipos: EquipoDetail[];
  readonly orders: any = [
    { text: 'Ascendente', id: 'asc' },
    { text: 'Descendente', id: 'desc' },
  ];
  selectedOrder = 'asc';
  nombre = '';
  type = AlertType;

  constructor(
    private deporteService: DeporteService,
    private equipoService: EquipoService,
  ) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.getDeportesAndEquipos();
    this.getFollowedEquipos();
  }

  get noDeportes() {
    return !isNil(this.deportes) && isEmpty(this.deportes);
  }

  getDeportesAndEquipos() {
    return this.deporteService.getDeportes()
      .subscribe((deportes: Deporte[]) => {
        this.deportes = deportes;
        if (!isEmpty(this.deportes)) {
          this.selectedDeporteId = deportes[0].id;
          this.deporteService.getEquipos(this.selectedDeporteId)
            .subscribe((equipos: EquipoDetail[]) => {
              this.equipos = equipos;
            });
        }
      });
  }

  getFollowedEquipos(): void {
    this.equipoService.getFollowedEquipos().subscribe((followedEquipos: EquipoDetail[]) => {
      this.followedEquipos = followedEquipos;
    });
  }

  getEquiposAndFollowedEquipos(): void {
    forkJoin([
      this.deporteService.getEquipos(this.selectedDeporteId),
      this.equipoService.getFollowedEquipos()
    ]).subscribe(([equipos, followedEquipos]) => {
      this.equipos = equipos;
      this.followedEquipos = followedEquipos;
    });
  }

  onFilterChanged(): void {
    this.deporteService.getEquipos(this.selectedDeporteId, this.selectedOrder)
      .subscribe((equipos: EquipoDetail[]) => {
        this.equipos = equipos;
      });
  }

  onFollowEquipo(equipo: EquipoDetail): void {
    const followEquipo$ = this.isFollowedEquipo(equipo)
      ? this.equipoService.unFollowEquipo([equipo.id])
      : this.equipoService.followEquipos([equipo.id]);

    followEquipo$.subscribe(() => this.getEquiposAndFollowedEquipos());
  }

  isFollowedEquipo(equipo: EquipoDetail) {
    return some(this.followedEquipos, { id: equipo.id });
  }

  getFollowButtonText(equipo: EquipoDetail): string {
    return this.isFollowedEquipo(equipo) ? 'DEJAR DE SEGUIR' : 'SEGUIR';
  }

  getFollowIconClass(equipo: EquipoDetail): string {
    return this.isFollowedEquipo(equipo) ? 'followed' : 'not-followed';
  }
}
