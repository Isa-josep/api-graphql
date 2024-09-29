import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './group.entity/group.entity';
import { GrupoUsuario } from './group.entity/grupo-usuario.entity';
import { User } from 'src/users/user.entity/user.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
    
    @InjectRepository(GrupoUsuario)
    private grupoUsuariosRepository: Repository<GrupoUsuario>,

    @InjectRepository(User)
    private usersRepository: Repository<User>, // Repositorio para usuarios
  ) {}

  // Obtener todos los grupos
  async findAll(): Promise<Group[]> {
    return await this.groupsRepository.find(); // Esto debería traer todos los grupos
  }
  

  // Crear un nuevo grupo
  async create(createGroupDto: { nombre: string; creadorId: number }): Promise<Group> {
    const newGroup = this.groupsRepository.create({ ...createGroupDto, creador_id: createGroupDto.creadorId }); // Asegúrate de mapear el creadorId a creador_id
    return await this.groupsRepository.save(newGroup);
  }
  

  // Lógica para agregar un usuario a un grupo
  async addUserToGroup(groupId: number, userId: number): Promise<boolean> {
    // Verificar si el grupo existe
    const group = await this.groupsRepository.findOne({ where: { id: groupId } });
    if (!group) {
      throw new Error('El grupo no existe');
    }

    // Verificar si el usuario existe
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('El usuario no existe');
    }

    // Verificar si la relación ya existe
    const existingRelation = await this.grupoUsuariosRepository.findOne({
      where: { grupo_id: groupId, usuario_id: userId },
    });

    if (existingRelation) {
      throw new Error('El usuario ya está en el grupo');
    }

    // Crear la relación entre grupo y usuario
    const groupUser = this.grupoUsuariosRepository.create({
      grupo_id: groupId,
      usuario_id: userId,
    });
    await this.grupoUsuariosRepository.save(groupUser);

    return true;
  }
}
