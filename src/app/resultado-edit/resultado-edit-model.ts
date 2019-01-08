import { EncuentroDetail } from '../entities/encuentroDetail';

export interface ResultadoEditModel {
  encuentro: EncuentroDetail;
}

export enum ResultType {
  Winner,
  Positions,
}
