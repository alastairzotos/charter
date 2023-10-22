import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { OAuthUserInfo } from 'dtos';
import { IOauthVerifier } from 'interfaces/oauth-verifier';

@Injectable()
export class FacebookOAuthService implements IOauthVerifier {
  async verifyAccessToken(accessToken: string): Promise<OAuthUserInfo | null> {
    try {
      const result = (
        await axios.get(
          `https://graph.facebook.com/me?access_token=${accessToken}&fields=email,first_name`,
        )
      ).data;

      const { email, ...details } = result;

      return {
        email,
        givenName: details.first_name,
      };
    } catch {
      return null;
    }
  }
}
