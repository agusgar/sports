import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { Mode } from '../entities/mode';
import { isEmpty } from 'lodash';
import { UsuarioEditModel } from './usuario-edit-model';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.scss']
})
export class UsuarioEditComponent implements OnInit {
  isDisabled: boolean;    
  usuarioEditForm: FormGroup;
  showDelay = new FormControl(500);

  constructor(
    public dialogRef: MatDialogRef<UsuarioEditComponent>,
    @Inject(MAT_DIALOG_DATA) public model: UsuarioEditModel,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService) { }

  ngOnInit() {
    
    this.usuarioEditForm = this.formBuilder.group({
      nombre: [this.model.usuario.nombre, Validators.required],
      nombreUsuario: [this.model.usuario.apellido, Validators.required],
      clave: [this.model.usuario.clave, Validators.required],
      apellido: [this.model.usuario.apellido, Validators.required],
      telefono: [this.model.usuario.telefono, Validators.required],
      mail: [this.model.usuario.mail, Validators.required],
      esAdmin: [this.model.usuario.esAdmin]

    });
    switch (this.model.mode) {
      case Mode.New:
       this.isDisabled=false;
        break;
      case Mode.Change:
      this.isDisabled=true;
        break;
    }
  }

  get nombreUsuario() {
    return this.usuarioEditForm.get('nombreUsuario');
  }
  get nombre() {
    return this.usuarioEditForm.get('nombre');
  }
  get clave() {
    return this.usuarioEditForm.get('clave');
  }
  get apellido() {
    return this.usuarioEditForm.get('apellido');
  }
  get telefono() {
    return this.usuarioEditForm.get('telefono');
  }
  get mail() {
    return this.usuarioEditForm.get('mail');
  }
  get esAdmin() {
    return this.usuarioEditForm.get('esAdmin');
  }
  

  
  onSubmit(): void {
    const usuario = {
      
      nombreUsuario: this.nombreUsuario.value,
      clave: this.clave.value,
      nombre: this.nombre.value,
      apellido: this.apellido.value,
      telefono: this.telefono.value,
      mail: this.mail.value,
      esAdmin: this.esAdmin.value
    };

    switch (this.model.mode) {
      case Mode.New:
        this.usuarioService.addUsuario(usuario).subscribe(result => this.dialogRef.close(true));
        break;
      case Mode.Change:
        this.usuarioService.changeUsuario(usuario).subscribe(result => this.dialogRef.close(true));
        break;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
