import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { OAuthUserInfo } from 'dtos';
import { IOauthVerifier } from 'interfaces/oauth-verifier';

@Injectable()
export class GoogleOAuthService implements IOauthVerifier {
  async verifyAccessToken(accessToken: string): Promise<OAuthUserInfo | null> {
    try {
      const result = (
        await axios.get('https://www.googleapis.com/userinfo/v2/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      ).data;

      const { email, ...details } = result;

      return {
        email,
        givenName: details.given_name,
      };
    } catch {
      return null;
    }
  }
}
