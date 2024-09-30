import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GroupsService } from './groups.service';
import { Group } from './group.entity/group.entity';
import { AddUserToGroupDto } from './add-user-to-group.dto';
@Resolver(of => Group)
export class GroupsResolver {
  constructor(private readonly groupsService: GroupsService) {}

  // Query para obtener todos los grupos
  @Query(returns => [Group])
  async groups() {
    return this.groupsService.findAll();
  }

  // Mutación para crear un nuevo grupo
  @Mutation(returns => Group)
async createGroup(
  @Args('nombre') nombre: string,
  @Args('creador_id', { type: () => Int }) creadorId: number, // nombre de argumento en camelCase
) {
  return this.groupsService.create({ nombre, creadorId }); // Asegúrate de pasar el creadorId
}


  // Mutación para agregar un usuario a un grupo
  @Mutation(() => Boolean)
async addUserToGroup(
  @Args('groupId') groupId: number,
  @Args('userId') userId: number,
) {
  // Crea el DTO
  const addUserToGroupDto: AddUserToGroupDto = { groupId, userId };
  return this.groupsService.addUserToGroup(addUserToGroupDto);
}
}
