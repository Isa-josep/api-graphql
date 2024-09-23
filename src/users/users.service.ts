import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async findByEmail(correo: string): Promise<User> {
    return this.usersRepository.findOne({ where: { correo } });
  }

  async create(userData: Partial<User>): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.contrasena, 10);
    const newUser = this.usersRepository.create({ ...userData, contrasena: hashedPassword });
    return this.usersRepository.save(newUser);
  }

  async updateRole(id: number, rol: string): Promise<User> {
    await this.usersRepository.update(id, { rol });
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
