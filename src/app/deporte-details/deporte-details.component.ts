import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DeporteService } from '../services/deporte.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Deporte } from '../entities/deporte';
import { EquipoDetail } from '../entities/equipoDetail';
import { EquipoEditComponent } from '../equipo-edit/equipo-edit.component';
import { ConfirmComponent } from '../confirm/confirm.component';
import { EquipoService } from '../services/equipo.service';
import { Mode } from '../entities/mode';
import { DeporteEditComponent } from '../deporte-edit/deporte-edit.component';
import { AlertType } from '../action-alert/action-alert-type';

@Component({
  selector: 'app-deporte-details',
  templateUrl: './deporte-details.component.html',
  styleUrls: ['./deporte-details.component.scss']
})
export class DeporteDetailsComponent implements OnInit {
  deporte: Deporte;
  equipos: EquipoDetail[];
  showDelay = new FormControl(500);
  type = AlertType;

  constructor(
    private deporteService: DeporteService,
    private equipoService: EquipoService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
    this.getDeporte();
  }

  getDeporte(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    forkJoin([this.deporteService.getDeporte(id), this.deporteService.getEquipos(id)])
      .subscribe(([deporte, equipos]) => {
        this.deporte = deporte;
        this.equipos = equipos;
      });
  }

  getEmptyEquipo() {
    return { nombre: '', deporteId: this.deporte.id };
  }

  onAddEquipo(): void {
    const dialogRef = this.dialog.open(EquipoEditComponent, {
      width: '500px',
      data: {
        equipo: this.getEmptyEquipo(),
        mode: Mode.New,
      },
    });

    dialogRef.afterClosed().subscribe(result => this.getDeporte());
  }

  onDeleteEquipo(equipo: EquipoDetail): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '300px',
      data: {
        title: 'Eliminar Equipo',
        lines: [
          `Se eliminará el equipo ${equipo.nombre} del sistema`,
          '¿Desea continuar?'
        ]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.equipoService.deleteEquipo(equipo.id)
          .subscribe(() => this.equipos = this.equipos.filter(d => d !== equipo));
      }
    });
  }

  onChangeDeporte(): void {
    const dialogRef = this.dialog.open(DeporteEditComponent, {
      width: '500px',
      data: { deporte: this.deporte, mode: Mode.Change },
    });

    dialogRef.afterClosed().subscribe(result => this.getDeporte());
  }

  onDeleteDeporte(): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '300px',
      data: {
        title: 'Eliminar Deporte',
        lines: [
          `Se eliminará el deporte ${this.deporte.nombre} del sistema`,
          '¿Desea continuar?'
        ],
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deporteService.deleteDeporte(this.deporte.id)
          .subscribe(() => this.router.navigateByUrl('/deportes'));
      }
    });
  }

}
