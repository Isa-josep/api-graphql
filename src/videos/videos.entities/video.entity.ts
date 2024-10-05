import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity() // Esta anotación indica que Video es una entidad de la base de datos
export class Video {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  titulo: string;

  @Field()
  @Column()
  url: string;
}
