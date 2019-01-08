import { AlertType } from './action-alert-type';

export interface ActionAlertModel {
  links?: Link[];
  type: AlertType;
  message: string;
}

export interface Link {
  href: string;
  text: string;
}
