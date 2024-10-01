// videos/entities/video.entity.ts
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Video {
  @Field(() => Int)
  id: number;

  @Field()
  titulo: string;

  @Field()
  url: string;
}
