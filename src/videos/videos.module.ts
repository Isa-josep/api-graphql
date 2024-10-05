import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoService } from './videos.service';
import { VideoResolver } from './videos.resolver';
import { Video } from './videos.entities/video.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Video])], // Importa el repositorio de Video
  providers: [VideoService, VideoResolver],
})
export class VideosModule {}
