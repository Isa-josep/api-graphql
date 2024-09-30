import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsService } from './groups.service';
import { GroupsResolver } from './groups.resolver';
import { Group } from './group.entity/group.entity';
import { GrupoUsuario } from './group.entity/grupo-usuario.entity';
import { User } from 'src/users/user.entity/user.entity'; // Asegúrate de que está importado correctamente

@Module({
  imports: [
    TypeOrmModule.forFeature([Group, GrupoUsuario, User]), // Asegúrate de que GrupoUsuario está aquí
  ],
  providers: [GroupsService, GroupsResolver],
  exports: [GroupsService, TypeOrmModule], // Exporta lo necesario para otros módulos
})
export class GroupsModule {}
