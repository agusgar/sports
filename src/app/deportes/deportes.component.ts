import { Component, OnInit } from '@angular/core';
import { DeporteService } from '../services/deporte.service';
import { Deporte } from '../entities/deporte';
import { MatDialog } from '@angular/material';
import { ConfirmComponent } from '../confirm/confirm.component';
import { DeporteEditComponent } from '../deporte-edit/deporte-edit.component';
import { Mode } from '../entities/mode';
import { FormControl } from '@angular/forms';
import { AlertType } from '../action-alert/action-alert-type';
import { isNil, isEmpty } from 'lodash';

@Component({
  selector: 'app-deportes',
  templateUrl: './deportes.component.html',
  styleUrls: ['./deportes.component.scss']
})
export class DeportesComponent implements OnInit {
  deportes: Deporte[];
  showDelay = new FormControl(500);
  type = AlertType;

  constructor(
    private deportesService: DeporteService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getDeportes();
  }

  getEmptyDeporte(): Deporte {
    return {
      nombre: '',
      admiteEncuentrosMultiples: false,
    };
  }

  get noDeportes(): boolean {
    return !isNil(this.deportes) && isEmpty(this.deportes);
  }

  getDeportes(): void {
    this.deportesService.getDeportes().subscribe(deportes => this.deportes = deportes);
  }

  onAddDeporte(): void {
    const dialogRef = this.dialog.open(DeporteEditComponent, {
      width: '500px',
      data: {
        deporte: this.getEmptyDeporte(),
        mode: Mode.New,
      },
    });

    dialogRef.afterClosed().subscribe(result => this.getDeportes());
  }

  onDeleteDeporte(deporte: Deporte): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '300px',
      data: {
        title: 'Eliminar Deporte',
        lines: [
          `Se eliminará el deporte ${deporte.nombre} del sistema`,
          '¿Desea continuar?'
        ],
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deportesService.deleteDeporte(deporte.id)
          .subscribe(() => this.deportes = this.deportes.filter(d => d !== deporte));
      }
    });
  }
}
