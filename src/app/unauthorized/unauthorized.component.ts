import { Component, OnInit } from '@angular/core';
import { AlertType } from '../action-alert/action-alert-type';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit {
  type = AlertType;
  msg = 'No tiene acceso a la pagina o recurso que esta intentando acceder.';

  constructor() { }

  ngOnInit() {
  }

}
