import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity/user.entity';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User])],  // Registra la entidad
  providers: [UsersService, UsersResolver],  // Registra el servicio y resolver
  exports: [UsersService],  // Exporta el servicio si es necesario
})
export class UsersModule {}
