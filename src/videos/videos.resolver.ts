// videos/videos.resolver.ts
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VideoService } from './videos.service';
import { Video } from './videos.entities/video.entity';


@Resolver(() => Video)
export class VideoResolver {
  constructor(private readonly videoService: VideoService) {}

  @Query(() => [Video], { name: 'obtenerVideos' })
  obtenerVideos() {
    return this.videoService.findAll();
  }

  @Mutation(() => Video)
  addVideo(
    @Args('titulo') titulo: string,
    @Args('url') url: string,
  ): Video {
    return this.videoService.create({ titulo, url });
  }

  @Mutation(() => Video)
  updateVideo(
    @Args('id', { type: () => Int }) id: number,
    @Args('titulo') titulo: string,
    @Args('url') url: string,
  ): Video {
    return this.videoService.update(id, { titulo, url });
  }

  @Mutation(() => Boolean)
  deleteVideo(@Args('id', { type: () => Int }) id: number): boolean {
    return this.videoService.remove(id);
  }
}
