import { Pipe, PipeTransform } from '@angular/core';
import { EquipoDetail } from '../entities/equipoDetail';

@Pipe({ name: 'nombreEquipoPipe' })
export class NombreEquipoPipe implements PipeTransform {
  transform(equipos: EquipoDetail[], nombre: string): EquipoDetail[] {
    return equipos.filter((equipo: EquipoDetail) => equipo.nombre.toLowerCase().indexOf(nombre.toLowerCase()) === 0);
  }
}
