import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  LoginResponse,
  UserDetails,
  RegisterDetails,
  LoginDetails,
  OAuthUserInfo,
  ResetPasswordDetails,
  InstanceDto,
  GetResetPwdOtc,
  ResetForgottenPwdResponse,
} from 'dtos';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';

import { EnvService } from 'environment/environment.service';
import { UsersRepository } from 'features/users/users.repository';
import { User } from 'schemas/user.schema';
import { IOauthVerifier } from 'interfaces/oauth-verifier';
import { FacebookOAuthService } from 'integrations/facebook-oauth/facebook-oauth.service';
import { GoogleOAuthService } from 'integrations/google-oauth/google-oauth.service';
import { EmailService } from 'integrations/email/email.service';
import { TemplatesService } from 'features/templates/templates.service';
import { urls } from 'urls';

@Injectable()
export class UsersService {
  constructor(
    private readonly env: EnvService,
    private readonly facebookOAuthService: FacebookOAuthService,
    private readonly googleOAuthService: GoogleOAuthService,
    private readonly emailService: EmailService,
    private readonly templatesService: TemplatesService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async getUsers() {
    return await this.usersRepository.getUsers();
  }

  async getAdmins(instance: string) {
    return await this.usersRepository.getAdmins(instance);
  }

  async getSuperAdmins() {
    return await this.usersRepository.getSuperAdmins();
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.getUserByEmail(email);
  }

  async updateUser(id: string, newUser: Partial<UserDetails>) {
    await this.usersRepository.updateUser(id, newUser);
  }

  async deleteUser(email: string) {
    await this.usersRepository.deleteUser(email);
  }

  async promoteBasicUserToOperator(id: string, instance: InstanceDto) {
    const user = await this.usersRepository.getUserById(id);

    if (!!user && (!user.role || user.role === 'user')) {
      await this.usersRepository.setUserRole(id, 'operator', instance);
      return true;
    }

    return false;
  }

  async resetPassword({
    email,
    oldPassword,
    newPassword,
  }: ResetPasswordDetails): Promise<LoginResponse> {
    email = email.trim();
    oldPassword = oldPassword.trim();
    newPassword = newPassword.trim();

    const user = await this.usersRepository.getUserByEmailWithPassword(email);

    if (!user) {
      return null;
    }

    const pwCheck = await bcrypt.compare(oldPassword, user.hashedPassword);

    if (!pwCheck) {
      return null;
    }

    await this.usersRepository.updatePassword(
      user._id,
      await bcrypt.hash(newPassword, 10),
    );

    return {
      accessToken: this.generateAccessToken(user),
    };
  }

  async registerUser({
    givenName,
    email,
    password,
  }: RegisterDetails): Promise<LoginResponse> {
    givenName = givenName.trim();
    email = email.trim();
    password = password.trim();

    const user = await this.usersRepository.registerUser(
      {
        givenName,
        email,
        role: 'user',
      },
      await bcrypt.hash(password, 10),
    );

    return {
      accessToken: this.generateAccessToken(user),
    };
  }

  async createUserFromOAuth2(details: OAuthUserInfo) {
    return await this.usersRepository.createUserFromOAuth2({
      ...details,
      role: 'user',
    });
  }

  async loginUser({
    email,
    password,
  }: LoginDetails): Promise<LoginResponse | null> {
    email = email.trim();
    password = password.trim();

    const user = await this.usersRepository.getUserByEmailWithPassword(email);

    if (!user) {
      return null;
    }

    const pwCheck = await bcrypt.compare(password, user.hashedPassword);

    if (!pwCheck) {
      return null;
    }

    return {
      accessToken: this.generateAccessToken(user),
    };
  }

  async loginWithFacebook(accessToken: string): Promise<LoginResponse | null> {
    return await this.loginOauth(accessToken, this.facebookOAuthService);
  }

  async loginWithGoogle(accessToken: string): Promise<LoginResponse | null> {
    return await this.loginOauth(accessToken, this.googleOAuthService);
  }

  async sendForgotPasswordEmail(email: string): Promise<boolean> {
    const user = await this.usersRepository.getUserByEmail(email);

    if (!user) {
      return false;
    }

    const expiry = Date.now() + 60 * 60 * 1000; // One hour from now

    const code = uuidv4();
    const hashedCode = this.hashResetPwdOtcCode(code);

    await this.usersRepository.createResetPwdOtc(user, hashedCode, expiry);

    const expiryDate = new Date(expiry);
    const expiryDateString =
      expiryDate.toDateString() + ' ' + expiryDate.toLocaleTimeString();

    await this.emailService.sendEmail(
      email,
      this.templatesService.forgotPassword(
        user.givenName,
        expiryDateString,
        `${this.env.get().managerUrl}${urls.forgotPasswordReset(code)}`,
      ),
    );

    return true;
  }

  async getResetPwdOtcIdFromCode(code: string): Promise<GetResetPwdOtc> {
    const hashedCode = this.hashResetPwdOtcCode(code);

    const resetPwdOtc = await this.usersRepository.getResetPwdOtcByHashedCode(
      hashedCode,
    );

    if (!resetPwdOtc) {
      return 'not-found';
    }

    if (Date.now() > resetPwdOtc.expires) {
      return 'expired';
    }

    return resetPwdOtc;
  }

  async resetForgottenPassword(
    otcId: string,
    newPassword: string,
  ): Promise<ResetForgottenPwdResponse> {
    const otc = await this.usersRepository.getResetPwdOtcById(otcId);

    if (!otc || Date.now() > otc.expires) {
      return 'invalid-otc';
    }

    const user = await this.usersRepository.getUserByEmailWithPassword(
      otc.user.email,
    );

    if (!user) {
      return 'no-user';
    }

    await this.usersRepository.updatePassword(
      user._id,
      await bcrypt.hash(newPassword, 10),
    );

    await this.usersRepository.expireResetPwdOtc(otcId);

    return 'success';
  }

  private async loginOauth(
    accessToken: string,
    verifier: IOauthVerifier,
  ): Promise<LoginResponse | null> {
    const details = await verifier.verifyAccessToken(accessToken);

    if (!details) {
      return null;
    }

    let user = await this.getUserByEmail(details.email);

    if (!user) {
      user = await this.createUserFromOAuth2(details);
    }

    return {
      accessToken: this.generateAccessToken(user),
    };
  }

  refreshAccessToken(user: User) {
    if (!!user) {
      return this.generateAccessToken(user);
    }

    return null;
  }

  generateAccessToken({ _id, email, givenName, role, instance }: User) {
    return jwt.sign(
      { _id, email, givenName, role, instance: instance?.toString() },
      this.env.get().jwtSigningKey,
    );
  }

  private hashResetPwdOtcCode(code: string) {
    return crypto.createHash('sha1').update(code).digest('hex');
  }
}
