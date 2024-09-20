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

  // Cambiar findByDate para buscar por creado_en
  async findByDate(creado_en: Date): Promise<Routine[]> {
    return this.routinesRepository.find({ where: { creado_en } });
  }
}
