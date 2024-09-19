import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsService } from './groups.service';
import { GroupsResolver } from './groups.resolver';
import { Group } from './group.entity/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group])], // Importa aquí la entidad 'Group'
  providers: [GroupsService, GroupsResolver],
})
export class GroupsModule {}
