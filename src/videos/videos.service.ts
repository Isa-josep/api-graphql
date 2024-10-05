import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './videos.entities/video.entity';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private videoRepository: Repository<Video>,
  ) {}

  async findAll(): Promise<Video[]> {
    return this.videoRepository.find(); // Busca todos los videos en la base de datos
  }

  async create(videoData: { titulo: string; url: string }): Promise<Video> {
    const video = this.videoRepository.create(videoData); // Crea una instancia de Video
    return this.videoRepository.save(video); // Guarda el video en la base de datos
  }

  async update(id: number, updateData: { titulo: string; url: string }): Promise<Video> {
    await this.videoRepository.update(id, updateData); // Actualiza el video
    return this.videoRepository.findOneBy({ id }); // Retorna el video actualizado
  }

  async remove(id: number): Promise<boolean> {
    await this.videoRepository.delete(id); // Elimina el video por su ID
    return true;
  }
}
