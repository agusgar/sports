import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';
import { ActionAlertModel } from './action-alert-model';
import { AlertType } from './action-alert-type';

@Component({
  selector: 'app-action-alert',
  templateUrl: './action-alert.component.html',
  styleUrls: ['./action-alert.component.scss']
})
export class ActionAlertComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) private data: ActionAlertModel) { }

  ngOnInit() {
  }

  get icon() {
    switch (this.data.type) {
      case AlertType.Error:
        return 'error';
      case AlertType.Success:
        return 'done';
      default:
    }
  }

  get message() {
    return this.data.message;
  }

  get type() {
    return this.data.type;
  }

  get links() {
    return this.data.links;
  }

  get color() {
    switch (this.data.type) {
      case AlertType.Error:
        return 'warn';
      case AlertType.Success:
        return 'primary';
      default:
    }
  }

}
