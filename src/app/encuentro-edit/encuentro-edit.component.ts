import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  MatDialogRef, MAT_DIALOG_DATA, MatTabGroupBase, MatChipEvent,
  MatChipInputEvent, MatAutocompleteSelectedEvent,
} from '@angular/material';
import { EncuentroEditModel } from './encuentro-edit-model';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { EncuentroService } from '../services/encuentro.service';
import { DeporteService } from '../services/deporte.service';
import { Deporte } from '../entities/deporte';
import { EquipoService } from '../services/equipo.service';
import { EquipoDetail } from '../entities/equipoDetail';
import { mergeMap, map, startWith } from 'rxjs/operators';
import { isNil, isEmpty, find } from 'lodash';
import { Observable, empty } from 'rxjs';
import { Mode } from '../entities/mode';
import { AlertType } from '../action-alert/action-alert-type';

@Component({
  selector: 'app-encuentro-edit',
  templateUrl: './encuentro-edit.component.html',
  styleUrls: ['./encuentro-edit.component.scss']
})
export class EncuentroEditComponent implements OnInit {
  encuentroEditForm: FormGroup;
  deportes: Deporte[];
  equipos: EquipoDetail[];
  autoCompleteOptions: Observable<EquipoDetail[]>;
  title: string;
  type = AlertType;

  constructor(
    public dialogRef: MatDialogRef<EncuentroEditComponent>,
    @Inject(MAT_DIALOG_DATA) public model: EncuentroEditModel,
    private formBuilder: FormBuilder,
    private encuentroService: EncuentroService,
    private deporteService: DeporteService,
  ) { }

  ngOnInit() {
    this.title = this.model.mode === Mode.New ? 'Agregar Encuentro' : 'Modificar Encuentro';
    this.encuentroEditForm = this.formBuilder.group({
      date: [this.model.encuentro.fechaYHora, Validators.required],
      selectedEquipoId: [],
      selectedDeporteId: [''],
      selectedEquipos: this.formBuilder.array([], [Validators.required, Validators.minLength(2)]),
    });

    this.getDeportes();
  }

  get date() {
    return this.encuentroEditForm.get('date');
  }

  get selectedDeporteId() {
    return this.encuentroEditForm.get('selectedDeporteId');
  }

  get selectedEquipoId() {
    return this.encuentroEditForm.get('selectedEquipoId');
  }

  get selectedEquipos() {
    return <FormArray>this.encuentroEditForm.get('selectedEquipos');
  }

  get noDeportes(): boolean {
    return !isNil(this.deportes) && isEmpty(this.deportes);
  }

  getDeportes(): void {
    this.deporteService.getDeportes()
      .pipe(
        map((response: Deporte[]) => response),
        mergeMap((deportes: Deporte[]) => {
          this.deportes = deportes;
          if (isEmpty(this.deportes)) {
            return empty();
          }
          this.encuentroEditForm.patchValue({
            selectedDeporteId: isNil(this.model.deporte) ? this.deportes[0].id : this.model.deporte.id,
          });
          return this.deporteService.getEquipos(this.selectedDeporteId.value);
        })
      )
      .subscribe((result: EquipoDetail[]) => {
        this.equipos = result;
        const selectedEquipos = this.selectedEquipos as FormArray;
        for (const selectedEquipoId of this.model.encuentro.idEquipos) {
          const equipo = find(this.equipos, { id: selectedEquipoId });
          selectedEquipos.push(this.formBuilder.control(equipo.nombre));
        }
        this.encuentroEditForm.patchValue({
          selectedEquipoId: this.equipos[0].id,
        });
      });
  }

  getEquipos(): void {
    this.deporteService.getEquipos(this.selectedDeporteId.value)
      .subscribe((result: EquipoDetail[]) => {
        this.equipos = result;
        const selectedEquipos = this.selectedEquipos;
        while (selectedEquipos.length !== 0) {
          selectedEquipos.removeAt(0);
        }
      });
  }

  onSelectedDeporteChange(selectChange): void {
    this.encuentroEditForm.patchValue({
      selectedDeporteId: selectChange.value,
    });
    this.getEquipos();
  }

  onAddEquipo(): void {
    const equipo: EquipoDetail = find(this.equipos, { id: this.selectedEquipoId.value }) as EquipoDetail;
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
    const selectedEquiposFormArray = this.selectedEquipos;
    const encuentro = {
      idEquipos: selectedEquiposFormArray.getRawValue().map(
        name => this.equipos.find(equipo => equipo.nombre === name).id
      ),
      fechaYHora: this.date.value,
    };

    switch (this.model.mode) {
      case Mode.New:
        this.encuentroService.addEncuentro(encuentro).subscribe(result => this.dialogRef.close(true));
        break;
      case Mode.Change:
        this.encuentroService.changeEncuentro(this.model.encuentro.id, {
          id: this.model.encuentro.id,
          ...encuentro
        }).subscribe(result => this.dialogRef.close(true));
        break;
    }
  }
}
