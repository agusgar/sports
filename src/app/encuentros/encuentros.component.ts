import { Component, OnInit } from '@angular/core';
import { EncuentroService } from '../services/encuentro.service';
import { Encuentro } from '../entities/encuentro';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Mode } from '../entities/mode';
import { EncuentroEdit } from '../entities/encuentroEdit';
import { EncuentroEditComponent } from '../encuentro-edit/encuentro-edit.component';
import { ConfirmComponent } from '../confirm/confirm.component';
import { isNil, isEmpty } from 'lodash';
import { AlertType } from '../action-alert/action-alert-type';

@Component({
  selector: 'app-encuentros',
  templateUrl: './encuentros.component.html',
  styleUrls: ['./encuentros.component.scss']
})
export class EncuentrosComponent implements OnInit {
  encuentros: Encuentro[];
  showDelay = new FormControl(500);
  type = AlertType;

  constructor(
    private encuentrosService: EncuentroService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getEncuentros();
  }

  get noEncuentros(): boolean {
    return !isNil(this.encuentros) && isEmpty(this.encuentros);
  }

  getEncuentros(): void {
    this.encuentrosService.getEncuentros().subscribe(encuentros => {
      encuentros.sort((a: Encuentro, b: Encuentro) => a.fechaYHora > b.fechaYHora ? 1 : -1);
      this.encuentros = encuentros;
    });
  }

  getEmptyEncuentro(): EncuentroEdit {
    return {
      fechaYHora: new Date(),
      idEquipos: [],
    };
  }

  onAddEncuentro(): void {
    const dialogRef = this.dialog.open(EncuentroEditComponent, {
      width: '500px',
      data: {
        encuentro: this.getEmptyEncuentro(),
        mode: Mode.New,
      },
    });

    dialogRef.afterClosed().subscribe(result => this.getEncuentros());
  }

  onDeleteEncuentro(encuentro: Encuentro): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '300px',
      data: {
        title: 'Eliminar Encuentro',
        lines: [
          `Se eliminará el encuentro del sistema`,
          '¿Desea continuar?'
        ],
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.encuentrosService.deleteEncuentro(encuentro.id)
          .subscribe(() => this.encuentros = this.encuentros.filter(e => e !== encuentro));
      }
    });
  }
}
