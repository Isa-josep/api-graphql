
import { Injectable } from '@nestjs/common';
import { Video } from './videos.entities/video.entity';

@Injectable()
export class VideoService {
  private videos: Video[] = [];

  findAll(): Video[] {
    return this.videos;
  }

  create(videoData: { titulo: string; url: string }): Video {
    const video = {
      id: this.videos.length + 1,
      ...videoData,
    };
    this.videos.push(video);
    return video;
  }

  update(id: number, updateData: { titulo: string; url: string }): Video {
    const video = this.videos.find((v) => v.id === id);
    if (video) {
      video.titulo = updateData.titulo;
      video.url = updateData.url;
    }
    return video;
  }

  remove(id: number): boolean {
    this.videos = this.videos.filter((v) => v.id !== id);
    return true;
  }
}
