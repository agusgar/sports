import { Mode } from '../entities/mode';
import { Deporte } from '../entities/deporte';

export interface DeporteEditModel {
  deporte: Deporte;
  mode: Mode;
}
