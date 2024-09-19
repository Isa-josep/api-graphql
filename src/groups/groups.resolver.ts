import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GroupsService } from './groups.service';
import { Group } from './group.entity/group.entity';

@Resolver(of => Group) // Esto le dice a GraphQL que el resolver maneja el tipo "Group"
export class GroupsResolver {
  constructor(private readonly groupsService: GroupsService) {}

  @Query(returns => [Group])
  async groups() {
    return this.groupsService.findAll();
  }

  @Mutation(returns => Group)
  async createGroup(
    @Args('nombre') nombre: string,
    @Args('creador_id') creador_id: number,
  ) {
    return this.groupsService.create({ nombre, creador_id });
  }

  @Mutation(returns => Boolean)
  async addUserToGroup(
    @Args('groupId') groupId: number,
    @Args('userId') userId: number,
  ) {
    return this.groupsService.addUserToGroup(groupId, userId);
  }
}
