import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { GrupoUsuario } from './grupo-usuario.entity'; // Importa la entidad GrupoUsuario

@ObjectType() // Decorador para hacer que la clase sea interpretable por GraphQL
@Entity('grupos') // Nombre de la tabla en la base de datos
export class Group {
  @PrimaryGeneratedColumn()
  @Field(type => Int) // Campo de GraphQL, indicando que es un entero
  id: number;

  @Column()
  @Field() // Campo de GraphQL, por defecto es de tipo String
  nombre: string;

  @Column()
  @Field(type => Int) // Campo de GraphQL, indicando que es un entero
  creador_id: number;

  // Relación uno a muchos con GrupoUsuario
  @OneToMany(() => GrupoUsuario, (grupoUsuario) => grupoUsuario.grupo) // Aquí defines la relación
  grupoUsuarios: GrupoUsuario[];
}
