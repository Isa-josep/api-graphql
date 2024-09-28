import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()  // Para GraphQL
@Entity('rutinas')  // Nombre de la tabla en la base de datos
export class Routine {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column()
  @Field()
  nombre: string;

  @Column()
  @Field()
  descripcion: string;

  @Column()
  @Field(type => Int)
  usuario_id: number;

  @Column()
  @Field(type => Int)
  grupo_id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  video_url: string;

  @Column()
  @Field()
  fecha_ejercicio: Date;  // Campo para la fecha programada de la rutina

  @Column()
  @Field()
  creado_en: Date;  // Fecha de creación de la rutina
}
