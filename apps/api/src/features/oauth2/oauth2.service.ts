import { Injectable } from '@nestjs/common';
import { OAuthUserInfo, LoginResponse } from 'dtos';
import { UsersService } from 'features/users/users.service';

@Injectable()
export class OAuth2Service {
  constructor(private readonly usersService: UsersService) {}

  async loginImplicit(details: OAuthUserInfo): Promise<LoginResponse> {
    let user = await this.usersService.getUserByEmail(details.email);

    if (!user) {
      user = await this.usersService.createUserFromOAuth2(details);
    }

    return {
      accessToken: this.usersService.generateAccessToken(user),
    };
  }
}
