import { Injectable } from "@nestjs/common";
import { FbLoginDetails, LoginResponse, UserDetails } from "dtos";
import { EnvService } from "environment/environment.service";
import { UsersService } from "features/users/users.service";
import { OAuth2Client } from 'google-auth-library';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class OAuth2Service {
  private readonly googleOAuth2Client: OAuth2Client;

  constructor(
    env: EnvService,
    private readonly usersService: UsersService,
  ) {
    this.googleOAuth2Client = new OAuth2Client({
      clientId: env.get().googleClientId,
      clientSecret: env.get().googleClientSecret,
      redirectUri: env.get().frontendUrl,
    })
  }

  async loginWithGoogle(code: string): Promise<LoginResponse> {
    const { tokens: { id_token } } = await this.googleOAuth2Client.getToken(code);

    const { email, given_name: givenName } = jwt.decode(id_token) as { email: string, name: string, given_name: string, family_name: string };

    const userDetails: UserDetails = { email, givenName };

    const user = await this.registerUserIfNotExists(userDetails);

    return {
      accessToken: await this.usersService.generateAccessToken(user)
    }
  }

  async loginWithFacebook(details: FbLoginDetails): Promise<LoginResponse> {
    const { email, first_name: givenName } = details;

    const userDetails: UserDetails = { email, givenName };

    const user = await this.registerUserIfNotExists(userDetails);

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
