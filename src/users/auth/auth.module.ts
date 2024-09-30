import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService],
  exports: [AuthService], // Exporta AuthService para usarlo en otros módulos
})
export class AuthModule {}
