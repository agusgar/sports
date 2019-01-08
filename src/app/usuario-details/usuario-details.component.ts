import { Component, OnInit } from '@angular/core';
import { UsuarioEdit } from '../entities/usuarioEdit';
import { FormControl } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioEditComponent } from '../usuario-edit/usuario-edit.component';
import { Mode } from '../entities/mode';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-usuario-details',
  templateUrl: './usuario-details.component.html',
  styleUrls: ['./usuario-details.component.scss']
})
export class UsuarioDetailsComponent implements OnInit {
  usuario: UsuarioEdit;
  showDelay = new FormControl(500);

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getUsuario();
  }

  getUsuario() {
    var nombreUsuario = this.route.snapshot.paramMap.get('nombreUsuario');
    this.usuarioService.getUsuario(nombreUsuario).subscribe(usuario => this.usuario = usuario);
  }

  onChangeUsuario(): void {
    const dialogRef = this.dialog.open(UsuarioEditComponent, {
      width: '500px',
      data: { usuario: this.usuario, mode: Mode.Change },
    });

    dialogRef.afterClosed().subscribe(result => this.getUsuario());
  }

  onDeleteUsuario(): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '300px',
      data: {
        title: 'Eliminar Usuario',
        lines: [
          `Se eliminará el usuario ${this.usuario.nombreUsuario} del sistema`,
          '¿Desea continuar?'
        ]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usuarioService.deleteUsuario(this.usuario.nombreUsuario)
          .subscribe(() => this.router.navigateByUrl('/usuarios'));
      }
    });
  }

}
