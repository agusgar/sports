import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../entities/usuario';
import { MatDialog } from '@angular/material';
import { ConfirmComponent } from '../confirm/confirm.component';
import { Mode } from '../entities/mode';
import { FormControl } from '@angular/forms';
import { UsuarioEdit } from '../entities/usuarioEdit';
import { UsuarioEditComponent } from '../usuario-edit/usuario-edit.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[];
  showDelay = new FormControl(500);

  constructor(private usuarioService: UsuarioService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(usuarios => {
      
      this.usuarios = usuarios;
    });
  }
  getEmptyUsuario(): UsuarioEdit {
    return {
      nombreUsuario: '',
      clave: '',
      nombre: '',
      apellido: '',
      telefono: '',
      mail: '',
      esAdmin: false
    };
  }
  
  onAddUsuario(): void {
    const dialogRef = this.dialog.open(UsuarioEditComponent, {
      width: '500px',
      data: {
        usuario: this.getEmptyUsuario(),
        mode: Mode.New,
      },
    });

    dialogRef.afterClosed().subscribe(result => this.getUsuarios());
  }
  onDeleteUsuario(usuario: Usuario): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '300px',
      data: {
        title: 'Eliminar Usuario',
        lines: [
          `Se eliminará el usuario ${usuario.nombreUsuario} del sistema`,
          '¿Desea continuar?'
        ],
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usuarioService.deleteUsuario(usuario.nombreUsuario)
          .subscribe(() => this.usuarios = this.usuarios.filter(u => u !== usuario));
      }
    });
  }
}
