import { Pipe, PipeTransform } from '@angular/core';
import { Comentario } from '../entities/comentario';

@Pipe({ name: 'comentariosEncuentro' })
export class ComentariosEncuentroPipe implements PipeTransform {
  transform(comentarios: Comentario[], id: number): Comentario[] {
    return comentarios.filter(comentario => comentario.idEncuentro === id);
  }
}
