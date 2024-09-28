import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RoutinesService } from './routines.service';
import { Routine } from './routine.entity/routine.entity';

@Resolver(of => Routine)
export class RoutinesResolver {
  constructor(private readonly routinesService: RoutinesService) {}

  @Query(returns => [Routine])
  async routines() {
    return this.routinesService.findAll();
  }

  @Mutation(returns => Routine)
  async createRoutine(
    @Args('nombre') nombre: string,
    @Args('descripcion') descripcion: string,
    @Args('usuario_id', { type: () => Int }) usuario_id: number,
    @Args('grupo_id', { type: () => Int }) grupo_id: number,
    @Args('fecha_ejercicio') fecha_ejercicio: Date,  // Fecha programada
    @Args('video_url', { nullable: true }) video_url?: string,
  ) {
    const creado_en = new Date();  // Fecha de creación automática
    return this.routinesService.create({
      nombre,
      descripcion,
      usuario_id,
      grupo_id,
      video_url,
      creado_en,
      fecha_ejercicio,
    });
  }

  @Query(returns => [Routine])
  async routinesByGroup(@Args('grupo_id', { type: () => Int }) grupo_id: number) {
    return this.routinesService.findByGroup(grupo_id);
  }

  @Query(returns => [Routine])
  async routinesByDate(@Args('fecha_ejercicio') fecha_ejercicio: Date) {
    return this.routinesService.findByDate(fecha_ejercicio);
  }
}
