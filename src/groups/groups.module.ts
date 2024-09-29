import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsService } from './groups.service';
import { GroupsResolver } from './groups.resolver';
import { Group } from './group.entity/group.entity';
import { GrupoUsuario } from './group.entity/grupo-usuario.entity';
import { User } from 'src/users/user.entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group, GrupoUsuario, User])],
  providers: [GroupsService, GroupsResolver],
})
export class GroupsModule {}
