import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
 // Importa la entidad Group
import { User } from 'src/users/user.entity/user.entity'; // Importa la entidad User
import { Group } from './group.entity';

@ObjectType()
@Entity('grupo_usuarios') // Nombre de la tabla en la base de datos
export class GrupoUsuario {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column({ name: 'grupo_id' })
  @Field(type => Int)
  grupo_id: number;

  @Column({ name: 'usuario_id' })
  @Field(type => Int)
  usuario_id: number;

  // Relación muchos a uno con Group
  @ManyToOne(() => Group, (group) => group.grupoUsuarios)
  @Field(() => Group) // Esto es opcional, solo si quieres exponerlo en GraphQL
  grupo: Group;

  // Relación muchos a uno con User
  @ManyToOne(() => User, (user) => user.grupoUsuarios) // Asegúrate de tener la propiedad grupoUsuarios en User
  @Field(() => User) // Esto es opcional, solo si quieres exponerlo en GraphQL
  usuario: User;
}
