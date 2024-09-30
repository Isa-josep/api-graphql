import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { User } from './user.entity/user.entity';
import * as bcrypt from 'bcrypt';
import { GrupoUsuario } from 'src/groups/group.entity/grupo-usuario.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(GrupoUsuario) // Inyecta el repositorio de GrupoUsuario
    private grupoUsuariosRepository: Repository<GrupoUsuario>,
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

  // Método para encontrar usuarios sin grupo
  // async findUsersWithoutGroup(): Promise<User[]> {
  //   return await this.usersRepository
  //     .createQueryBuilder('user')
  //     .leftJoin('user.grupoUsuarios', 'grupoUsuario')
  //     .where('grupoUsuario.id IS NULL') // Asegúrate de que el usuario no esté en ningún grupo
  //     .getMany();
  // }
  async findUsersWithoutGroup(): Promise<User[]> {
    const usuariosConGrupo = await this.grupoUsuariosRepository.find({
      select: ['usuario_id'],
    });
  
    const idsUsuariosConGrupo = usuariosConGrupo.map(rel => rel.usuario_id);
  
    return this.usersRepository.find({
      where: idsUsuariosConGrupo.length
        ? { id: Not(In(idsUsuariosConGrupo)) } // Excluye a los usuarios con grupo
        : {}, // Si no hay usuarios con grupo, trae todos
    });
  }
  
  
}
