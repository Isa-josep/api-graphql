import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './group.entity/group.entity';


@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
  ) {}

  async findAll(): Promise<Group[]> {
    return this.groupsRepository.find();
  }

  async create(data: Partial<Group>): Promise<Group> {
    const group = this.groupsRepository.create(data);
    return this.groupsRepository.save(group);
  }

  async addUserToGroup(groupId: number, userId: number): Promise<boolean> {
    // Lógica para añadir un usuario a un grupo
    // Se puede realizar una consulta SQL similar a tu archivo actual
    return true;
  }
}
