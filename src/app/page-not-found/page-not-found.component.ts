import { Component, OnInit } from '@angular/core';
import { AlertType } from '../action-alert/action-alert-type';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  type = AlertType;
  msg = 'La pagina o recurso que intento acceder no fue encontrada.';

  constructor() { }

  ngOnInit() {
  }

}
