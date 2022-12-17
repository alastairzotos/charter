import { Controller, Post, Get, Patch, Delete, Param, Body, ForbiddenException } from "@nestjs/common";
import { LoginResponse, UserDetails, RegisterDetails, LoginDetails } from "dtos";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async getUsers() {

  }

  @Get(':email')
  async getUserByEmail(@Param('email') email: string) {

  }

  @Patch()
  async updateUser(id: string, newUser: Partial<UserDetails>) {

  }

  @Delete()
  async deleteUser(
    @Body() { id }: { id: string }
  ) {

  }

  @Post()
  async registerUser(
    @Body() user: RegisterDetails
  ): Promise<LoginResponse> {
    return await this.usersService.registerUser(user);
  }

  @Post('login')
  async loginUser(
    @Body() loginDetails: LoginDetails
  ): Promise<LoginResponse> {
    const result = await this.usersService.loginUser(loginDetails);

    if (!result) {
      throw new ForbiddenException();
    }

    return result;
  }
}
