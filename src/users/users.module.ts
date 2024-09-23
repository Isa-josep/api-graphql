import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity/user.entity';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UsersResolver, AuthService],  // Agrega el AuthService
  exports: [UsersService],
})
export class UsersModule {}
