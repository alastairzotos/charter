import { Body, Controller, Post } from "@nestjs/common";
import { OAuthUserInfo } from "dtos";
import { OAuth2Service } from "features/oauth2/oauth2.service";

@Controller('oauth2')
export class OAuth2Controller {
  constructor(
    private readonly oauth2Service: OAuth2Service,
  ) {}

  @Post('implicit')
  async loginImplicit(
    @Body() details: OAuthUserInfo
  ) {
    return await this.oauth2Service.loginImplicit(details);
  }
}
