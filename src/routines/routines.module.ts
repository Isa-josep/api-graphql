import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutinesService } from './routines.service';
import { RoutinesResolver } from './routines.resolver';
import { Routine } from './routine.entity/routine.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Routine])],
  providers: [RoutinesService, RoutinesResolver],
})
export class RoutinesModule {}
