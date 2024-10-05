import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VideoService } from './videos.service';
import { Video } from './videos.entities/video.entity';

@Resolver(() => Video)
export class VideoResolver {
  constructor(private readonly videoService: VideoService) {}

  // Marcar la función como asíncrona
  @Query(() => [Video], { name: 'obtenerVideos' })
  async obtenerVideos(): Promise<Video[]> {
    return await this.videoService.findAll();
  }

  // Marcar la función como asíncrona y devolver una Promesa de tipo Video
  @Mutation(() => Video)
  async addVideo(
    @Args('titulo') titulo: string,
    @Args('url') url: string,
  ): Promise<Video> {
    return await this.videoService.create({ titulo, url });
  }

  // Marcar la función como asíncrona y devolver una Promesa de tipo Video
  @Mutation(() => Video)
  async updateVideo(
    @Args('id', { type: () => Int }) id: number,
    @Args('titulo') titulo: string,
    @Args('url') url: string,
  ): Promise<Video> {
    return await this.videoService.update(id, { titulo, url });
  }

  // Marcar la función como asíncrona y devolver una Promesa de tipo boolean
  @Mutation(() => Boolean)
  async deleteVideo(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return await this.videoService.remove(id);
  }
}
