import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Routine } from './routine.entity/routine.entity';

@Injectable()
export class RoutinesService {
  constructor(
    @InjectRepository(Routine)
    private readonly routinesRepository: Repository<Routine>,
  ) {}

  async findAll(): Promise<Routine[]> {
    return this.routinesRepository.find();
  }

  async create(data: Partial<Routine>): Promise<Routine> {
    const routine = this.routinesRepository.create(data);
    return this.routinesRepository.save(routine);
  }

  async findByGroup(grupo_id: number): Promise<Routine[]> {
    return this.routinesRepository.find({ where: { grupo_id } });
  }

  async findByDate(fecha_ejercicio: Date): Promise<Routine[]> {
    return this.routinesRepository.find({ where: { fecha_ejercicio } });  // Buscar por fecha programada
  }
}
