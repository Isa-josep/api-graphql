import { Module } from '@nestjs/common';
import { VideoService } from './videos.service'; 
import { VideoResolver } from './videos.resolver'; 

@Module({
  providers: [VideoService, VideoResolver], 
})
export class VideosModule {}
