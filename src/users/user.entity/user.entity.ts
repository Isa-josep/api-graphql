import { Entity, Column, PrimaryGeneratedColumn,  OneToMany  } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GrupoUsuario } from 'src/groups/group.entity/grupo-usuario.entity';

@ObjectType()  // Decorador de GraphQL
@Entity('usuarios')  // Nombre de la tabla en la base de datos
export class User {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column()
  @Field()
  nombre: string;

  @Column()
  @Field()
  apellido: string;

  @Column()
  @Field()
  nombre_usuario: string;

  @Column()
  @Field()
  correo: string;

  @Column()
  contrasena: string;  // Este campo no se expone en GraphQL por seguridad

  @Column()
  @Field()
  rol: string;
  @OneToMany(() => GrupoUsuario, (grupoUsuario) => grupoUsuario.usuario)
  grupoUsuarios: GrupoUsuario[];
}
