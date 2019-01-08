import { Component, OnInit, Input } from '@angular/core';
import { AlertType } from '../action-alert/action-alert-type';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() type: AlertType;
  @Input() msg: string;

  constructor() { }

  ngOnInit() {
  }

  get icon() {
    switch (this.type) {
      case AlertType.Info:
        return 'notification_important';
      case AlertType.Error:
        return 'error';
      case AlertType.Warn:
        return 'warning';
      case AlertType.Success:
        return 'done';
      default:
    }
  }

  get alertClass() {
    return {
      'alert-component': true,
      'alert-info': this.type === AlertType.Info,
      'alert-error': this.type === AlertType.Error,
      'alert-warn': this.type === AlertType.Warn,
      'alert-success': this.type === AlertType.Success,
    };
  }

  get color() {
    switch (this.type) {
      case AlertType.Info:
        return 'primary';
      case AlertType.Error:
        return 'warn';
      case AlertType.Warn:
        return 'primary';
      case AlertType.Success:
        return 'primary';
      default:
    }
  }
}
