import { Injectable } from "@nestjs/common";
import { OAuthUserInfo, LoginResponse, UserDetails } from "dtos";
import { UsersService } from "features/users/users.service";

@Injectable()
export class OAuth2Service {

  constructor(
    private readonly usersService: UsersService,
  ) {}

  async loginImplicit(details: OAuthUserInfo): Promise<LoginResponse> {
    const user = await this.registerUserIfNotExists(details);

    return {
      accessToken: await this.usersService.generateAccessToken(user)
    }
  }
  
  private async registerUserIfNotExists(details: UserDetails) {
    let user = await this.usersService.getUserByEmail(details.email);

    if (!user) {
      user = await this.usersService.createUserFromOAuth2(details);
    }

    return user;
  }
}
