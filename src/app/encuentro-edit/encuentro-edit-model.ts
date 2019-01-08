import { Mode } from '../entities/mode';
import { EncuentroEdit } from '../entities/encuentroEdit';
import { Deporte } from '../entities/deporte';

export interface EncuentroEditModel {
  encuentro: EncuentroEdit;
  deporte?: Deporte;
  mode: Mode;
}
