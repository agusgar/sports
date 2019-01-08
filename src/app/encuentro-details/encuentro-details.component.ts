import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncuentroService } from '../services/encuentro.service';
import { EncuentroDetail } from '../entities/encuentroDetail';
import { FormControl } from '@angular/forms';
import { EquipoService } from '../services/equipo.service';
import { forkJoin } from 'rxjs';
import { EquipoEdit } from '../entities/equipoEdit';
import { ConfirmComponent } from '../confirm/confirm.component';
import { MatDialog } from '@angular/material';
import { EncuentroEditComponent } from '../encuentro-edit/encuentro-edit.component';
import { Mode } from '../entities/mode';
import { Deporte } from '../entities/deporte';
import { DeporteService } from '../services/deporte.service';
import { ResultadoEditComponent } from '../resultado-edit/resultado-edit.component';

@Component({
  selector: 'app-encuentro-details',
  templateUrl: './encuentro-details.component.html',
  styleUrls: ['./encuentro-details.component.scss']
})
export class EncuentroDetailsComponent implements OnInit {
  encuentro: EncuentroDetail;
  deporte: Deporte;
  showDelay = new FormControl(500);
  equipos: EquipoEdit[];

  constructor(
    private encuentroService: EncuentroService,
    private equipoService: EquipoService,
    private deporteService: DeporteService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getEncuentro();
  }

  getEncuentro() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.encuentroService.getEncuentro(id)
      .subscribe(result => {
        this.encuentro = result;
        const equipos$ = this.encuentro.idEquipos.map(idEquipo => this.equipoService.getEquipo(idEquipo));
        forkJoin(equipos$).subscribe(equiposResponse => {
          this.equipos = equiposResponse;
          this.deporteService.getDeporte(this.equipos[0].deporteId)
            .subscribe(deporteResponse => this.deporte = deporteResponse);
        });
      });
  }

  onChangeEncuentro(): void {
    const dialogRef = this.dialog.open(EncuentroEditComponent, {
      width: '500px',
      data: {
        encuentro: this.encuentro,
        deporte: this.deporte,
        mode: Mode.Change,
      },
    });

    dialogRef.afterClosed().subscribe(result => this.getEncuentro());
  }

  onDeleteEncuentro(): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '300px',
      data: {
        title: 'Eliminar Encuentro',
        lines: [
          `Se eliminará el encuentro del sistema`,
          '¿Desea continuar?',
        ],
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.encuentroService.deleteEncuentro(this.encuentro.id)
          .subscribe(() => this.router.navigateByUrl('/encuentros'));
      }
    });
  }

  onAddResultEncuentro(): void {
    const dialogRef = this.dialog.open(ResultadoEditComponent, {
      width: '430px',
      data: { encuentro: this.encuentro },
    });
  }
}
