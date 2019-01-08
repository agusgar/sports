import { Component, OnInit, Input } from '@angular/core';
import { Comentario } from '../entities/comentario';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.scss']
})
export class ComentarioComponent implements OnInit {
  @Input() comentario: Comentario;

  constructor() { }

  get text() {
    return this.comentario.texto;
  }

  get user() {
    return this.comentario.nombreUsuario;
  }

  ngOnInit() {
  }

}
