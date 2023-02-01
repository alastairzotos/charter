import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  ForbiddenException,
} from '@nestjs/common';
import {
  LoginResponse,
  UserDetails,
  RegisterDetails,
  LoginDetails,
} from 'dtos';

import { UsersService } from 'features/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Get(':email')
  async getUserByEmail(@Param('email') email: string) {
    return await this.usersService.getUserByEmail(email);
  }

  @Patch()
  async updateUser(
    @Body() { id, newUser }: { id: string; newUser: Partial<UserDetails> },
  ) {
    return await this.usersService.updateUser(id, newUser);
  }

  @Delete()
  async deleteUser(@Body() { id }: { id: string }) {
    return await this.usersService.deleteUser(id);
  }

  @Post()
  async registerUser(@Body() user: RegisterDetails): Promise<LoginResponse> {
    return await this.usersService.registerUser(user);
  }

  @Post('login')
  async loginUser(@Body() loginDetails: LoginDetails): Promise<LoginResponse> {
    const result = await this.usersService.loginUser(loginDetails);

    if (!result) {
      throw new ForbiddenException();
    }

    return result;
  }
}
