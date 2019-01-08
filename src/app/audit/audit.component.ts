import { Component, OnInit, ViewChild } from '@angular/core';
import { Log } from '../entities/log';
import { LogService } from '../services/log.service';
import { MatTableDataSource, MatTable } from '@angular/material';

import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditComponent implements OnInit {
  displayedColumns: string[] = ['tipoAccion', 'nombreUsuario', 'fechaHora'];
  dataSource = new LogDataSource(this.logService, new Date(), new Date());
  logForm: FormGroup;
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(private logService: LogService, private formBuilder: FormBuilder) { }

  get fechaDesde() {
    return new Date(this.logForm.get('fechaDesde').value);
  }

  get fechaHasta() {
    return new Date(this.logForm.get('fechaHasta').value);
  }

  ngOnInit() {
    this.logForm = this.formBuilder.group({
      fechaDesde: [new Date()],
      fechaHasta: [new Date()]
    });
  }

  onSubmit(): void {
    this.dataSource = new LogDataSource(this.logService, this.fechaDesde, this.fechaHasta);
    this.table.renderRows();
  }
}

export class LogDataSource extends DataSource<any> {
  fechaDesde: Date;
  fechaHasta: Date;

  constructor(private logService: LogService, fechaDesde: Date, fechaHasta: Date) {
    super();
    this.fechaHasta = fechaHasta;
    this.fechaDesde = fechaDesde;
  }

  connect(): Observable<Log[]> {
    return this.logService.getLogsEntreFechas(this.fechaDesde, this.fechaHasta);
  }

  disconnect() {}
}
