
export interface Posicion {
    equipoDTO: EquipoDTO;
    puntaje:number;
  }
  export interface EquipoDTO {
    id: number;
    nombre:string;
    imagen:string;
    deporteId:number;
  }
