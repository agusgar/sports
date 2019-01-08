export class EquipoDetail {
  id: number;
  nombre: string;
  encuentroEquipo: { encuentroId: number, puntaje: number }[];
}
