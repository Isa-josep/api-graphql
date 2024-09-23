import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user.entity/user.entity';
// Creamos un DTO para la respuesta del login
import { BadRequestException } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LoginResponse } from './dto/login-response.dto';

@Resolver(of => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService, // Servicio para manejar la autenticación
  ) {}

  // Consulta para obtener todos los usuarios
  @Query(returns => [User])
  async users() {
    return this.usersService.findAll();
  }

  // Consulta para obtener un usuario por su ID
  @Query(returns => User)
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  // Mutación para crear un nuevo usuario
  @Mutation(returns => User)
  async createUser(
    @Args('nombre') nombre: string,
    @Args('apellido') apellido: string,
    @Args('nombre_usuario') nombre_usuario: string,
    @Args('correo') correo: string,
    @Args('contrasena') contrasena: string,
    @Args('rol') rol: string,
  ) {
    return this.usersService.create({
      nombre,
      apellido,
      nombre_usuario,
      correo,
      contrasena,
      rol,
    });
  }

  // Mutación para actualizar el rol de un usuario
  @Mutation(returns => User)
  async updateUserRole(
    @Args('id', { type: () => Int }) id: number,
    @Args('rol') rol: string,
  ) {
    return this.usersService.updateRole(id, rol);
  }

  // Mutación para eliminar un usuario
  @Mutation(returns => Boolean)
  async deleteUser(@Args('id', { type: () => Int }) id: number) {
    await this.usersService.delete(id);
    return true;
  }

  // Mutación para iniciar sesión
  @Mutation(returns => LoginResponse)
  async login(
    @Args('correo') correo: string,
    @Args('contrasena') contrasena: string,
  ): Promise<LoginResponse> {
    const user = await this.usersService.findByEmail(correo);
    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }

    const isPasswordValid = await this.authService.validatePassword(contrasena, user.contrasena);
    if (!isPasswordValid) {
      throw new BadRequestException('Contraseña incorrecta');
    }

    const token = this.authService.generateToken(user);

    return {
      token,
      user,
    };
  }
}
