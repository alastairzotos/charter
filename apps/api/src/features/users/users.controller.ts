import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  ForbiddenException,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'auth/auth.guard';
import { Roles } from 'auth/roles.decorator';
import { Principal } from 'decorators/principal.decorator';
import {
  LoginResponse,
  UserDetails,
  RegisterDetails,
  LoginDetails,
  OAuthUserInfo,
} from 'dtos';

import { UsersService } from 'features/users/users.service';
import { SentryInterceptor } from 'interceptors/sentry.interceptor';
import { User } from 'schemas/user.schema';

@Controller('users')
@UseInterceptors(SentryInterceptor)
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('all')
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Get(':email')
  @Roles('all')
  async getUserByEmail(@Param('email') email: string) {
    return await this.usersService.getUserByEmail(email);
  }

  @Patch()
  @Roles('all')
  async updateUser(
    @Body() { id, newUser }: { id: string; newUser: Partial<UserDetails> },
  ) {
    return await this.usersService.updateUser(id, newUser);
  }

  @Delete()
  @Roles('all')
  async deleteUser(@Body() { email }: { email: string }) {
    return await this.usersService.deleteUser(email);
  }

  @Post()
  @Roles('all')
  async registerUser(@Body() user: RegisterDetails): Promise<LoginResponse> {
    return await this.usersService.registerUser(user);
  }

  @Post('login')
  @Roles('all')
  async loginUser(@Body() loginDetails: LoginDetails): Promise<LoginResponse> {
    const result = await this.usersService.loginUser(loginDetails);

    if (!result) {
      throw new ForbiddenException();
    }

    return result;
  }

  @Post('login-oauth')
  @Roles('all')
  async loginImplicit(@Body() details: OAuthUserInfo) {
    return await this.usersService.loginUserOAuth(details);
  }

  @Post('refresh-token')
  refreshAccessToken(@Principal() user: User) {
    return this.usersService.refreshAccessToken(user);
  }
}
