import { Component, OnInit, Inject } from '@angular/core';
import { ResultadoEditModel, ResultType } from './resultado-edit-model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EncuentroDetail } from '../entities/encuentroDetail';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { EquipoService } from '../services/equipo.service';
import { forkJoin } from 'rxjs';
import { EquipoEdit } from '../entities/equipoEdit';
import { find } from 'lodash';
import { EncuentroService } from '../services/encuentro.service';

@Component({
  selector: 'app-resultado-edit',
  templateUrl: './resultado-edit.component.html',
  styleUrls: ['./resultado-edit.component.scss']
})
export class ResultadoEditComponent implements OnInit {
  resultadoEditForm: FormGroup;
  type = ResultType;
  equipos: EquipoEdit[];
  readonly EMPATE_ID: number = 0;

  constructor(
    public dialogRef: MatDialogRef<ResultadoEditComponent>,
    @Inject(MAT_DIALOG_DATA) public model: ResultadoEditModel,
    private formBuilder: FormBuilder,
    private equipoService: EquipoService,
    private encuentroService: EncuentroService,
  ) { }

  ngOnInit() {
    this.getEquipos();
  }

  get resultType(): ResultType {
    return this.encuentro.idEquipos.length > 2
      ? ResultType.Positions
      : ResultType.Winner;
  }

  get encuentro(): EncuentroDetail {
    return this.model.encuentro;
  }

  get firstEquipo() {
    return this.equipos[0];
  }

  get secondEquipo() {
    return this.equipos[1];
  }

  get selectedEquipoId() {
    return this.resultadoEditForm.get('selectedEquipoId');
  }

  get selectedEquipos() {
    return <FormArray>this.resultadoEditForm.get('selectedEquipos');
  }

  get winner() {
    return this.resultadoEditForm.get('winner');
  }

  getEquipos(): void {
    forkJoin(this.encuentro.idEquipos.map(idEquipo => this.equipoService.getEquipo(idEquipo)))
      .subscribe(result => {
        this.equipos = result;
        switch (this.resultType) {
          case ResultType.Winner:
            this.resultadoEditForm = this.formBuilder.group({
              winner: [this.firstEquipo.id, Validators.required],
            });
            break;
          case ResultType.Positions:
            this.resultadoEditForm = this.formBuilder.group({
              selectedEquipoId: [],
              selectedEquipos: this.formBuilder.array([], [Validators.required, Validators.minLength(3)])
            });
            break;
        }
      });
  }

  onAddEquipo(): void {
    const equipo: EquipoEdit = find(this.equipos, { id: this.selectedEquipoId.value }) as EquipoEdit;
    const selectedEquipos = this.selectedEquipos as FormArray;
    if (!this.selectedEquipos.getRawValue().includes(equipo.nombre)) {
      selectedEquipos.push(this.formBuilder.control(equipo.nombre));
    }
  }

  onRemoveEquipo(equipo: FormControl): void {
    const selectedEquipos = this.selectedEquipos;
    selectedEquipos.removeAt(selectedEquipos.getRawValue().indexOf(equipo.value));
  }

  onSubmit(): void {
    switch (this.resultType) {
      case ResultType.Winner:
        const equipos = this.winner.value === this.EMPATE_ID
          ? [this.firstEquipo.id, this.secondEquipo.id]
          : [this.winner.value];
        this.encuentroService.addResult({
          idEncuentro: this.encuentro.id,
          idEquipos: equipos,
        }).subscribe(result => this.dialogRef.close(true));
        break;

      case ResultType.Positions:
        const selectedEquipos = this.selectedEquipos as FormArray;
        const idEquipos = selectedEquipos
          .getRawValue()
          .map(selectedEquipo => this.equipos.find(equipo => equipo.nombre === selectedEquipo).id);

        this.encuentroService.addResult({
          idEncuentro: this.encuentro.id,
          idEquipos,
        }).subscribe(result => this.dialogRef.close(true));
        this.dialogRef.close(true);
        break;
    }
  }
}
