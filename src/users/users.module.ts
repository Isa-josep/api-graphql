import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './user.entity/user.entity';
import { GroupsModule } from 'src/groups/groups.module'; // Módulo de Grupos
import { AuthModule } from 'src/users/auth/auth.module'; // Importa AuthModule

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // User Repository
    GroupsModule, // Importa el módulo que contiene GrupoUsuarioRepository
    AuthModule,  // Importa el AuthModule
  ],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
