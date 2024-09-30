import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './group.entity/group.entity';
import { GrupoUsuario } from './group.entity/grupo-usuario.entity';
import { User } from 'src/users/user.entity/user.entity';
import { CreateGroupDto } from './create-group.dto';
import { AddUserToGroupDto } from './add-user-to-group.dto';


@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,

    @InjectRepository(GrupoUsuario)
    private grupoUsuariosRepository: Repository<GrupoUsuario>,

    @InjectRepository(User)
    private usersRepository: Repository<User>, 
  ) {}

  // Obtener todos los grupos
  async findAll(): Promise<Group[]> {
    return await this.groupsRepository.find();
  }

  // Crear un nuevo grupo
  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const newGroup = this.groupsRepository.create({
      nombre: createGroupDto.nombre,
      creador_id: createGroupDto.creadorId,
    });

    try {
      return await this.groupsRepository.save(newGroup);
    } catch (error) {
      throw new HttpException(
        'No se pudo crear el grupo',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Lógica para agregar un usuario a un grupo
  async addUserToGroup(addUserToGroupDto: AddUserToGroupDto): Promise<boolean> {
    const { groupId, userId } = addUserToGroupDto;

    // Verificar si el grupo existe
    const group = await this.groupsRepository.findOne({ where: { id: groupId } });
    if (!group) {
      throw new HttpException('El grupo no existe', HttpStatus.NOT_FOUND);
    }

    // Verificar si el usuario existe
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
    }

    // Verificar si la relación ya existe
    const existingRelation = await this.grupoUsuariosRepository.findOne({
      where: { grupo_id: groupId, usuario_id: userId },
    });

    if (existingRelation) {
      throw new HttpException('El usuario ya está en el grupo', HttpStatus.CONFLICT);
    }

    // Crear la relación entre grupo y usuario
    const groupUser = this.grupoUsuariosRepository.create({
      grupo_id: groupId,
      usuario_id: userId,
    });

    try {
      await this.grupoUsuariosRepository.save(groupUser);
      return true;
    } catch (error) {
      throw new HttpException(
        'No se pudo agregar el usuario al grupo',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
