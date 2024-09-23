import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  async validatePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }

  generateToken(user: any): string {
    const payload = { userId: user.id, correo: user.correo };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
  }
}
