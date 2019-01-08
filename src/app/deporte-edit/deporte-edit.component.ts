import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeporteEditModel } from './deporte-edit-model';
import { DeporteService } from '../services/deporte.service';
import { Mode } from '../entities/mode';

@Component({
  selector: 'app-deporte-edit',
  templateUrl: './deporte-edit.component.html',
  styleUrls: ['./deporte-edit.component.scss']
})
export class DeporteEditComponent implements OnInit {
  title: string;
  deporteEditForm: FormGroup;
  showDelay = new FormControl(500);
  isDisabled: boolean;

  constructor(
    public dialogRef: MatDialogRef<DeporteEditComponent>,
    @Inject(MAT_DIALOG_DATA) public model: DeporteEditModel,
    private formBuilder: FormBuilder,
    private deporteService: DeporteService) { }

  ngOnInit() {
    this.title = this.model.mode === Mode.New ? 'Agregar Deporte' : 'Modificar Deporte';
    this.deporteEditForm = this.formBuilder.group({
      nombre: [this.model.deporte.nombre, Validators.required],
      admiteEncuentrosMultiples: [this.model.deporte.admiteEncuentrosMultiples],
    });
    switch (this.model.mode) {
      case Mode.New:
        this.isDisabled = false;
        break;
      case Mode.Change:
      this.isDisabled = true;
        break;
    }
  }

  get nombre() {
    return this.deporteEditForm.get('nombre');
  }

  get admiteEncuentrosMultiples() {
    return this.deporteEditForm.get('admiteEncuentrosMultiples');
  }

  onSubmit(): void {
    const deporte = {
      nombre: this.nombre.value,
      id: this.model.deporte.id,
      admiteEncuentrosMultiples: this.admiteEncuentrosMultiples.value
    };

    switch (this.model.mode) {
      case Mode.New:
        this.deporteService.addDeporte(deporte).subscribe(result => this.dialogRef.close(true));
        break;
      case Mode.Change:
        this.deporteService.changeDeporte(deporte).subscribe(result => this.dialogRef.close(true));
        break;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
