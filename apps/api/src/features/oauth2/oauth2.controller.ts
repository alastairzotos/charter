import { Body, Controller, Post } from "@nestjs/common";
import { FbLoginDetails, GoogleLoginRequest } from "dtos";
import { OAuth2Service } from "features/oauth2/oauth2.service";

@Controller('oauth2')
export class OAuth2Controller {
  constructor(
    private readonly oauth2Service: OAuth2Service,
  ) {}

  @Post('google')
  async loginWithGoogle(
    @Body() { code }: GoogleLoginRequest
  ) {
    return await this.oauth2Service.loginWithGoogle(code);
  }

  @Post('facebook')
  async loginWithFacebook(
    @Body() details: FbLoginDetails
  ) {
    return await this.oauth2Service.loginWithFacebook(details);
  }
}
