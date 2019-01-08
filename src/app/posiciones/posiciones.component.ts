import { Component, OnInit, ViewChild } from '@angular/core';
import { DeporteService } from '../services/deporte.service';
import { Deporte } from '../entities/deporte';
import { Posicion } from '../entities/posicion';
import { MatTable } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { isNil, isEmpty } from 'lodash';
import { AlertType } from '../action-alert/action-alert-type';

@Component({
  selector: 'app-posiciones',
  templateUrl: './posiciones.component.html',
  styleUrls: ['./posiciones.component.scss']
})
export class PosicionesComponent implements OnInit {
  deportes: Deporte[];
  posiciones: Posicion[];
  selectedDeporteId: number;
  displayedColumns: string[] = ['nombreEquipo', 'puntaje'];
  dataSource: any = new Observable<any[]>();
  @ViewChild(MatTable) table: MatTable<any>;
  type = AlertType;

  constructor(
    private deporteService: DeporteService
  ) { }

  ngOnInit() {
    this.getDeportes();
  }

  get noDeportes(): boolean {
    return !isNil(this.deportes) && isEmpty(this.deportes);
  }

  getDeportes(): void {
    this.deporteService.getDeportes().subscribe(response => this.deportes = response);
  }

  onSelectedDeporteChange(selectChange): void {
    this.selectedDeporteId = selectChange.value;
    this.dataSource = new PosicionesDataSource(this.deporteService, selectChange.value);
    this.table.renderRows();
  }
}

export class PosicionesDataSource extends DataSource<any> {
  id: number;

  constructor(private deporteService: DeporteService, id: number) {
    super();
    this.id = id;
  }

  connect(): Observable<Posicion[]> {
    return this.deporteService.getPosiciones(this.id);
  }

  disconnect() {}
}
