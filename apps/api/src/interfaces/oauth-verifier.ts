import { OAuthUserInfo } from 'dtos';

export interface IOauthVerifier {
  verifyAccessToken(accessToken: string): Promise<OAuthUserInfo | null>;
}
