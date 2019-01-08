import { Component, OnInit, ViewChild } from '@angular/core';
import { Deporte } from '../entities/deporte';
import { DeporteService } from '../services/deporte.service';
import { EncuentroService } from '../services/encuentro.service';
import { FormControl } from '@angular/forms';
import { EncuentroEdit } from '../entities/encuentroEdit';
import { Equipo } from '../entities/equipo';
import { isNil, isEmpty } from 'lodash';
import { AlertType } from '../action-alert/action-alert-type';

@Component({
  selector: 'app-listados',
  templateUrl: './listados.component.html',
  styleUrls: ['./listados.component.scss']
})
export class ListadosComponent implements OnInit {

  deportes: Deporte[];
  encuentros: EncuentroEdit[];
  equipos: Equipo[];
  showDelay = new FormControl(500);
  selectedDeporteId: number;
  selectedEquipoId = '0';
  show = false;
  type = AlertType;

  constructor(
    private deporteService: DeporteService,
    private encuentroService: EncuentroService,
  ) { }

  ngOnInit() {
    this.getDeportes();
  }

  get noDeportes(): boolean {
    return !isNil(this.deportes) && isEmpty(this.deportes);
  }

  getEncuentros(idDeporte: number): void {
    this.encuentroService.getEncuentrosPorDeporte(idDeporte).subscribe(response => {
      this.encuentros = response;
      this.show = this.encuentros.length > 0;
    });
  }

  getEncuentrosDeEquipo(idEquipo: number): void {
    this.encuentroService.getEncuentrosPorEquipo(idEquipo).subscribe(response => {
      this.encuentros = response;
      this.show = this.encuentros.length > 0;
    });
  }

  getEquipos(idDeporte: number): void {
    this.deporteService.getEquipos(idDeporte).subscribe(response => this.equipos = response);
  }

  getDeportes(): void {
    this.deporteService.getDeportes().subscribe(response => {
      this.deportes = response;

      if (!isEmpty(this.deportes)) {
        this.selectedDeporteId = this.deportes[0].id;
        this.getEquipos(this.selectedDeporteId);
        this.getEncuentros(this.selectedDeporteId);
      }
    });
  }

  onSelectedDeporteChange(selectChange): void {
    this.selectedDeporteId = selectChange.value;
    this.getEncuentros(this.selectedDeporteId);
    this.getEquipos(this.selectedDeporteId);
  }

  onSelectedEquipoChange(selectChange): void {
    if (selectChange.value === '0') {
      this.getEncuentros(this.selectedDeporteId);
    } else {
      this.getEncuentrosDeEquipo(selectChange.value);
    }
  }
}
