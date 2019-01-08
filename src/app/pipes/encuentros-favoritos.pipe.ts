import { Pipe, PipeTransform } from '@angular/core';
import { Encuentro } from '../entities/encuentro';
import { EquipoDetail } from '../entities/equipoDetail';

@Pipe({ name: 'followedEncuentros' })
export class EncuentrosFavoritosPipe implements PipeTransform {
  transform(encuentros: Encuentro[], followedEquipos: EquipoDetail[]): Encuentro[] {
    return encuentros
      .filter(encuentro => encuentro.idEquipos
        .some(id => followedEquipos
          .some(followedEquipo => followedEquipo.id === id)));
  }
}
