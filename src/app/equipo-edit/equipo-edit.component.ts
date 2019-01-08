import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EquipoEdit } from '../entities/equipoEdit';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EquipoService } from '../services/equipo.service';
import { EquipoEditModel } from './equipo-edit-model';
import { Mode } from '../entities/mode';
import { isEmpty } from 'lodash';

@Component({
  selector: 'app-equipo-edit',
  templateUrl: './equipo-edit.component.html',
  styleUrls: ['./equipo-edit.component.scss']
})
export class EquipoEditComponent implements OnInit {
  equipoEditForm: FormGroup;
  base64: string;
  showDelay = new FormControl(500);

  constructor(
    public dialogRef: MatDialogRef<EquipoEditComponent>,
    @Inject(MAT_DIALOG_DATA) public model: EquipoEditModel,
    private formBuilder: FormBuilder,
    private equipoService: EquipoService) { }

  ngOnInit() {
    const hasImage: boolean = !isEmpty(this.model.equipo.imagen);
    this.equipoEditForm = this.formBuilder.group({
      name: [this.model.equipo.nombre, Validators.required],
      image: this.model.equipo.imagen,
      imageName: [{ value: '', disabled: !hasImage }],
      hasImage,
    });
  }

  get name() {
    return this.equipoEditForm.get('name');
  }

  get image() {
    return this.equipoEditForm.get('image');
  }

  get hasImage() {
    return this.equipoEditForm.get('hasImage');
  }

  get imageName() {
    return this.equipoEditForm.get('imageName');
  }

  onImageChange(event): void {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const [image] = event.target.files;
      reader.readAsDataURL(image);
      reader.onload = () => {
        this.equipoEditForm.patchValue({
          image: reader.result,
          imageName: image.name,
          hasImage: true,
        });
      };
    }
  }

  onHasImageChange(): void {
    this.equipoEditForm.patchValue({ imageName: '', image: '' });
    if (this.hasImage.value) {
      this.imageName.enable();
    } else {
      this.imageName.disable();
    }
  }

  onSubmit(): void {
    const equipo = {
      deporteId: this.model.equipo.deporteId,
      nombre: this.name.value,
      imagen: this.image.value,
    };

    switch (this.model.mode) {
      case Mode.New:
        this.equipoService.addEquipo(equipo).subscribe(result => this.dialogRef.close(true));
        break;
      case Mode.Change:
        this.equipoService.changeEquipo(this.model.equipo.id, {
          id: this.model.equipo.id,
          ...equipo
        }).subscribe(result => this.dialogRef.close(true));
        break;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
