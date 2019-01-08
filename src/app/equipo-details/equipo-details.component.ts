import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipoService } from '../services/equipo.service';
import { EquipoEdit } from '../entities/equipoEdit';
import { FormControl } from '@angular/forms';
import { EquipoEditComponent } from '../equipo-edit/equipo-edit.component';
import { MatDialog } from '@angular/material';
import { Mode } from '../entities/mode';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-equipo-details',
  templateUrl: './equipo-details.component.html',
  styleUrls: ['./equipo-details.component.scss']
})
export class EquipoDetailsComponent implements OnInit {
  equipo: EquipoEdit;
  showDelay = new FormControl(500);

  constructor(
    private route: ActivatedRoute,
    private equipoService: EquipoService,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getEquipo();
  }

  getEquipo() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.equipoService.getEquipo(id).subscribe(equipo => this.equipo = equipo);
  }

  onChangeEquipo(): void {
    const dialogRef = this.dialog.open(EquipoEditComponent, {
      width: '500px',
      data: { equipo: this.equipo, mode: Mode.Change },
    });

    dialogRef.afterClosed().subscribe(result => this.getEquipo());
  }

  onDeleteEquipo(): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '300px',
      data: {
        title: 'Eliminar Equipo',
        lines: [
          `Se eliminará el equipo ${this.equipo.nombre} del sistema`,
          '¿Desea continuar?'
        ]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.equipoService.deleteEquipo(this.equipo.id)
          .subscribe(() => this.router.navigateByUrl(`/deportes/${this.equipo.deporteId}`));
      }
    });
  }

}
