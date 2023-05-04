import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  LoginResponse,
  UserDetails,
  RegisterDetails,
  LoginDetails,
  OAuthUserInfo,
} from 'dtos';
import * as jwt from 'jsonwebtoken';

import { EnvService } from 'environment/environment.service';
import { UsersRepository } from 'features/users/users.repository';
import { User } from 'schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    private readonly env: EnvService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async getUsers() {
    return await this.usersRepository.getUsers();
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

  async promoteBasicUserToOperator(id: string) {
    const user = await this.usersRepository.getUserById(id);

    if (!!user && (!user.role || user.role === 'user')) {
      await this.usersRepository.setUserRole(id, 'operator');
      return true;
    }

    return false;
  }

  async registerUser({
    givenName,
    email,
    password,
  }: RegisterDetails): Promise<LoginResponse> {
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

  async loginUserOAuth(details: OAuthUserInfo): Promise<LoginResponse> {
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
}
